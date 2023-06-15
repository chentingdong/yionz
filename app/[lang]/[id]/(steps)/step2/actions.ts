"use server";

import { Audio, Clip } from "@prisma/client";

import cuid from "cuid";
import { getArtifact } from "@/app/[lang]/action";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { s3Upload } from "@/app/api/services/s3";
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
  console.log('create clip');
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
      image: {
        create: {
          clipId: clipId,
        },
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
}) => {
  try {
    const filename = 'audio.mp3';
    const audioStream = await textToSpeechPolly(audio.text);
    const url: string = await s3Upload({
      fileBuffer: audioStream,
      artifactId: artifactId,
      clipId: audio.clipId,
      filename: filename
    });
    await prisma.audio.update({
      where: {
        clipId: audio.clipId,
      },
      data: {
        url: url
      }
    });
  } catch (err) {
    throw err.message;
  } finally {
    redirect(`/${artifactId}/step2`);
  }
};
