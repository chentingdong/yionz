"use server";

import prisma from "@/prisma/prisma";

/***********
 * Animation
 ***********/
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
