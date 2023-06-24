"use server";

import { Animation } from "@prisma/client";
import prisma from "@/prisma/prisma";

export const createAnimation = async (clipId: string): Promise<Animation> => {
  const animation = await prisma.animation.create({
    data: {
      clip: {
        connect: {
          id: clipId
        }
      }
    }
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
