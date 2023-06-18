"use server";

import { Audio, Clip, Image } from "@prisma/client";
import { s3Delete, s3Upload } from "@/app/api/services/s3";

import cuid from "cuid";
import { getArtifact } from "@/app/[lang]/action";
import { getArtifactTemplate } from "@/app/[lang]/templates/actions";
import gm from 'gm';
import prisma from "@/prisma/prisma";
import { revalidateTag } from "next/cache";
import { textToSpeechPolly } from "@/app/api/services/polly";

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

  await updateAudio(clip0.id, text);
  await updateAnimation(clip0.id, text);
};

export const updateAudio = async (clipId: string, text: string) => {
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

const updateAnimation = async (clipId: string, text: string) => {
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

export const generateAudio = async ({
  audio,
  artifactId,
}: {
  audio: Audio;
  artifactId: string;
}): Promise<string> => {
  try {
    const filename = 'audio.mp3';
    const audioStream = await textToSpeechPolly(audio.text);
    const url: string = await s3Upload({
      fileBuffer: audioStream,
      filename: filename,
      artifactId: artifactId,
      clipId: audio.clipId
    });
    await prisma.audio.update({
      where: {
        clipId: audio.clipId,
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

export const uploadImage = async (data: FormData): Promise<Image> => {
  const file = data.get('file') as File;
  const artifactId = data.get('artifactId')?.toString();
  const clipId = data.get('clipId')?.toString();
  if (!artifactId || !clipId || !file) return;

  const template = await getArtifactTemplate(artifactId);
  const fileBuffer = await processImage({ file, width: template?.width, height: template?.height });

  let order = Number(data.get('order'));

  try {
    const url = await s3Upload({
      fileBuffer: fileBuffer,
      filename: file.name,
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
  try {
    // delete file from s3
    const keyPath = new URL(image.url).pathname;
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