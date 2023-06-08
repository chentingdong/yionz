"use server";

import { Clip } from "@prisma/client";
import { getArtifact } from "@/app/[lang]/action";
import prisma from "@/prisma/prisma";

export const initClips = async (artifactId: string) => {
  const artifact = await getArtifact(artifactId);
  const clipsTexts = artifact?.story?.split("\n\n")?.slice(0, 1);
  if (!clipsTexts) return;

  const clips = await Promise.all(
    clipsTexts.map(async (text: string, index: number) => {
      return await initClip(artifactId, index, text);
    })
  );

  return clips;
};

export const initClip = async (artifactId: string, index: number, text: string): Promise<Clip> => {
  const clip0 = await prisma.clip.findUnique({
    where: {
      artifactId_order: {
        artifactId: artifactId,
        order: index
      }
    }
  });

  if (clip0) updateClip(artifactId, clip0, index, text);
  else createClip(artifactId, index, text);
};

const createClip = async (artifactId: string, index: number, text: string) => {
  const clip = await prisma.clip.create({
    data: {
      Artifact: {
        connect: {
          id: artifactId
        }
      },
      order: index,
      loading: false,
    }
  });

  await updateAudio(clip.id, text);
};

const updateClip = async (artifactId: string, clip0: Clip, index: number, text: string) => {
  await updateAudio(clip0.id, text);
};

const updateAudio = async (clipId: string, text: string) => {
  console.log(clipId, text);

  await prisma.audio.upsert({
    where: {
      clipId: clipId
    },
    create: {
      text: text
    },
    update: {
      text: text
    }
  });
};