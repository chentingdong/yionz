"use server";

import { Template } from "@prisma/client";
import { chatGPT } from "@/app/api/services/openai";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

// Update the name
export async function updateName({ id, name }) {
  await prisma.artifact.update({
    where: { id: id, },
    data: { name: name }
  });

  revalidatePath(`/${id}`);
}
// Update the prompt
export async function updatePrompt({ id, prompt }) {
  await prisma.artifact.update({
    where: { id: id, },
    data: { prompt: prompt }
  });

  revalidatePath(`/${id}`);
}

// Manually update the story
export async function updateStory({ id, story }) {
  await prisma.artifact.update({
    where: { id: id, },
    data: { story: story }
  });

  revalidatePath(`/${id}`);
}

// update the template
export async function chooseTemplate({ id, selected }: { id: string, selected: Template; }) {
  await prisma.artifact.update({
    where: { id: id },
    data: { template: { disconnect: true } }
  });

  await prisma.artifact.update({
    where: { id: id },
    data: {
      template: {
        connect: {
          id: selected.id
        }
      }
    }
  });

  revalidatePath(`/${id}`);
}

// Ask AI to generate a story
export async function makeStory({ id }) {
  const artifact = await prisma.artifact.findUnique({
    where: { id: id, },
    include: { template: true, }
  });
  const story = await chatGPT(artifact);
  updateStory({ id, story });
  revalidatePath(`/${id}`);
}