"use server";

import { Audio, Clip, Image, Prisma, Video } from "@prisma/client";
import { s3Delete, s3Upload } from "@/app/api/services/s3";

import { Readable } from 'stream';
import cuid from "cuid";
import { getArtifact } from "@/app/[lang]/action";
import { getArtifactTemplate } from "@/app/[lang]/templates/actions";
import gm from 'gm';
import prisma from "@/prisma/prisma";
import sanitize from 'sanitize-s3-objectkey';
import { textToSpeechPolly } from "@/app/api/services/polly";

/*********
 * Clip
 *********/
export const initClips = async (artifactId: string) => {
  const artifact = await getArtifact(artifactId);
  if (!artifact?.story) return;

  const clipsTexts = artifact.story.split("\n\n").filter((clipText) => {
    return clipText.length > 0;
  });

  if (!clipsTexts || clipsTexts?.length === 0) return;

  for (let i = 0; i < clipsTexts.length; i++) {
    await initClip(artifactId, i, clipsTexts[i]);
  }

  return;
};

export const initClip = async (
  artifactId: string,
  index: number,
  text: string
) => {
  const clip0 = await prisma.clip.findUnique({
    where: {
      artifactId_order: {
        artifactId: artifactId,
        order: index,
      },
    },
  });

  if (clip0) updateClip(artifactId, clip0, index, text);
  else createClip(artifactId, index, text);
};

const createClip = async (
  artifactId: string,
  index: number,
  text: string
): Promise<Clip> => {
  const clipId = cuid();

  const clip = await prisma.clip.create({
    data: {
      id: clipId,
      Artifact: {
        connect: {
          id: artifactId,
        },
      },
      audio: {
        create: {
          clipId: clipId,
          text: text,
        },
      },
      images: {
        create: [],
      },
      video: {
        create: {
          clipId: clipId,
        },
      },
      animation: {
        create: {
          clipId: clipId,
          prompt: text,
        },
      },
      film: {
        create: {
          clipId: clipId,
        },
      },
      order: index,
      loading: false,
    },
  });
  return clip;
};

const updateClip = async (
  artifactId: string,
  clip0: Clip,
  index: number,
  text: string
) => {
  console.log('update clip');

  await updateAudioText(clip0.id, text);
  await updateAnimationPrompt(clip0.id, text);
};

/*********
 * Audio
 *********/
export const updateAudioText = async (clipId: string, text: string) => {
  await prisma.audio.upsert({
    where: {
      clipId: clipId,
    },
    create: {
      clipId: clipId,
      text: text,
    },
    update: {
      clipId: clipId,
      text: text,
    },
  });
};

export const generateAudio = async ({
  audio,
  artifactId,
}: {
  audio: Audio;
  artifactId: string;
}): Promise<string> => {

  const template = await getArtifactTemplate(artifactId);
  const pollyParams = getVoiceParams(template);

  try {
    const filename = 'audio.mp3';
    const audioStream = await textToSpeechPolly(audio.text, pollyParams);
    const url: string = await s3Upload({
      fileBuffer: audioStream,
      filename: filename,
      artifactId: artifactId,
      clipId: audio.clipId
    });

    await prisma.audio.update({
      where: {
        id: audio.id
      },
      data: {
        url: url
      }
    });
    return url;
  } catch (err) {
    throw err.message;
  }
};

export const deleteAudio = async (id: string) => {
  // get audio info from db
  const audio = await prisma.audio.findUniqueOrThrow({
    where: {
      id: id
    }
  });
  if (!audio.url) return;
  try {
    // delete file from s3
    const keyPath = new URL(audio.url).pathname.substring(1);
    await s3Delete(keyPath);

    // delete image record from db
    await prisma.audio.update({
      where: {
        id: id
      },
      data: {
        url: ' '
      }
    });
  } catch (error) {
    throw error;
  }
};

// TODO: Move these to polly.ts
export type PollyParamsProps = {
  VoiceId: string;
  LanguageCode: string;
};
const getVoiceParams = (template: Template): PollyParamsProps => {
  const defaultParams = { LanguageCode: 'en-US', VoiceId: 'Amy' };
  const instructionsObject = template?.instructions as Prisma.JsonObject;
  const voice = instructionsObject.voice;
  if (voice !== 'awsPolly') {
    console.warn("Voicd not supported, use default 'Amy', please check template.");
    return defaultParams;
  }
  const paramsObject = template?.params as Prisma.JsonObject;
  const awsPolly = paramsObject.awsPolly as Prisma.JsonObject;

  return {
    VoiceId: awsPolly.VoiceId as string || 'Amy',
    LanguageCode: awsPolly.LanguageCode as string || 'en-US'
  };
};

/*********
 * Images
 *********/
export const uploadImage = async (data: FormData): Promise<Image | null> => {
  const file = data.get('file') as File;
  const artifactId = data.get('artifactId')?.toString();
  const clipId = data.get('clipId')?.toString();
  if (!artifactId || !clipId || !file) return null;

  const template = await getArtifactTemplate(artifactId);
  const fileBuffer = await processImage({ file, width: template?.width, height: template?.height });

  let order = Number(data.get('order'));

  console.log('upload params:', file.name, artifactId, clipId, order);
  try {
    const url = await s3Upload({
      fileBuffer: fileBuffer,
      filename: sanitize(file.name),
      artifactId: artifactId,
      clipId: clipId
    });

    const image = await prisma.image.upsert({
      where: {
        clipId_order: {
          clipId: clipId,
          order: order
        }
      },
      create: {
        clipId: clipId,
        order: order,
        url: url
      },
      update: {
        url: url
      }
    });
    return image;
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (id: string) => {
  // get image info from db
  const image = await prisma.image.findUniqueOrThrow({
    where: {
      id: id
    }
  });
  if (!image.url) return;

  try {
    // delete file from s3
    let keyPath = new URL(image.url).pathname.substring(1);
    await s3Delete(keyPath);

    // delete image record from db
    await prisma.image.delete({
      where: {
        id: id
      }
    });
  } catch (err) {
    throw err;
  }
};

/**
 * use graphicmagick to resize and crop image to the dimension defined by template of the artifact.
 */
const processImage = async ({ file, width, height }: {
  file: File,
  width: number | undefined,
  height: number | undefined;
}) => {
  if (!width || !height) return;

  const imageData = await file.arrayBuffer();
  return await gm(Buffer.from(imageData))
    .resize(width, height, '^')
    .gravity('Center')
    .crop(width, height)
    .stream();
};

/***********
 * Video
 ***********/

export const uploadVideo = async (data: FormData): Promise<Video | null> => {
  const file = data.get('file') as File;
  const artifactId = data.get('artifactId')?.toString();
  const clipId = data.get('clipId')?.toString();
  if (!artifactId || !clipId || !file) return null;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  try {
    const url = await s3Upload({
      fileBuffer: fileBuffer,
      filename: sanitize(file.name),
      artifactId: artifactId,
      clipId: clipId
    });

    const video = await prisma.video.upsert({
      where: {
        clipId: clipId
      },
      create: {
        clipId: clipId,
        url: url
      },
      update: {
        url: url
      }
    });
    return video;
  } catch (error) {
    throw error;
  }
};

export const deleteVideo = async (id: string) => {
  // get video info from db
  const video = await prisma.video.findUniqueOrThrow({
    where: {
      id: id
    }
  });
  if (!video.url) return;
  try {
    // delete file from s3
    const keyPath = new URL(video.url).pathname.substring(1);
    await s3Delete(keyPath);

    // delete image record from db
    await prisma.video.update({
      where: {
        id: id
      },
      data: {
        url: ' '
      }
    });
  } catch (error) {
    throw error;
  }
};

/***********
 * Animation
 ***********/
const updateAnimationPrompt = async (clipId: string, text: string) => {
  await prisma.animation.upsert({
    where: {
      clipId: clipId,
    },
    create: {
      clipId: clipId,
      prompt: text,
    },
    update: {
      clipId: clipId,
      prompt: text,
    },
  });
};
