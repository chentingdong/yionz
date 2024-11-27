"use server";

import { Animation, Clip } from "@prisma/client";
import { getArtifactTemplate } from "@/app/[lang]/templates/actions";
import prisma from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import { sdTxt2Video } from "@/app/api/intenal/sdvideos";

export const createAnimation = async (clipId: string): Promise<Animation> => {
  const animation = await prisma.animation.create({
    data: {
      clipId: clipId,
    },
  });
  return animation;
};

export const updateAnimationPrompt = async (clipId: string, text: string) => {
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

export const deleteAnimation = async (id: string) => {
  await prisma.animation.delete({
    where: {
      id: id,
    },
  });
};

export const generateAnimation = async ({id, clip}: {id: string, clip: Clip}): Promise<void> => {
  const animation = await prisma.animation.findUniqueOrThrow({
    where: { id: id },
  });
  const template = await getArtifactTemplate(clip.artifactId);
  const instruction = (template?.instructions as Prisma.JsonObject).image;
  const prompts = animation.prompt.split('.').map(p => `${instruction}. ${p}`);

  const url = await sdTxt2Video({
    clipId: clip.id,
    prompts: prompts,
    width: template?.width || 768,
    height: template?.height || 512
  });

  await prisma.animation.update({
    where: { id: id },
    data: { url: url }
  });
};
