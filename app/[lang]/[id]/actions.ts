"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

// Update the prompt
export async function updatePrompt({ id, prompt }) {
  return await prisma.artifact.update({
    where: {
      id: id,
    },
    data: {
      prompt: prompt
    }
  });

  revalidatePath(`/${id}`);
}

// Manually update the story
export async function updateStory({ id, story }) {
  return await prisma.artifact.update({
    where: {
      id: id,
    },
    data: {
      story: story
    }
  });

  revalidatePath(`/${id}`);
}

// Ask AI to generate a story
export async function makeStory({ id }) {
  const artifact = await prisma.artifact.findUnique({
    where: {
      id: id,
    },
    include: {
      template: true,
    }
  });
  console.log(artifact);
}