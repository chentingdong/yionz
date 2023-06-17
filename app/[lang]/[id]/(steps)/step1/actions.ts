"use server";

import { Template } from "@prisma/client";
import { chatGPT } from "@/app/api/services/openai";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

// Update the name
export const updateName = async ({ id, name }) => {
  await prisma.artifact.update({
    where: { id: id },
    data: {
      name: name,
    },
  });

  revalidatePath(`/${id}`);
};
// Update the prompt
export const updatePrompt = async ({ id, prompt }) => {
  await prisma.artifact.update({
    where: { id: id },
    data: { prompt: prompt },
  });

  revalidatePath(`/${id}`);
};

// Manually update the story
export async function updateStory({ id, story }) {
  await prisma.artifact.update({
    where: { id: id },
    data: { story: story },
  });

  revalidatePath(`/${id}`);
}

// update the template
export const chooseTemplate = async ({
  id,
  selected,
}: {
  id: string;
  selected?: Template;
}) => {
  if (!selected) return;
  await prisma.artifact.update({
    where: { id: id },
    data: {
      template: {
        connect: {
          id: selected.id,
        },
      },
    },
  });

  revalidatePath(`/${id}`);
};

// Ask AI to generate a story
export const makeStory = async (id: string) => {
  const artifact = await prisma.artifact.findUnique({
    where: { id: id },
    include: { template: true },
  });
  const story = await chatGPT(artifact);
  updateStory({ id, story });
  revalidatePath(`/${id}`);
};
