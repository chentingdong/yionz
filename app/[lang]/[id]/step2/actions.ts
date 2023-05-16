"use server";

import { Clip } from "@prisma/client";
import { getArtifact } from "../step1/actions";
import prisma from "@/prisma/prisma";

export const initClips = async (id: string) => {
  const artifact = await getArtifact(id);
  const clipsTexts = artifact?.story?.split("\n\n")?.slice(0, 1);
  if (!clipsTexts) return;

  const clips = await Promise.all(
    clipsTexts.map(async (text: string, index: number) => {
      return await initClip(id, index, text);
    })
  );

  return clips;
};

export const initClip = async (id: string, index: number, text: string): Promise<Clip> => {
  console.log(id, index, text);

  const clip = await prisma.clip.create({
    data: {
      order: index,
      images: {
        create: {
          prompt: text,
        }
      },
      animation: {
        create: {}
      },
      video: { create: {} },
      audio: {
        create: {
          text: text
        }
      },
      film: { create: {} },
      loading: false,
      Artifact: {
        connect: { id: id }
      }
    },
    include: {
      animation: true,
      video: true,
      audio: true,
      images: true,
    }
  });
  return clip;
};