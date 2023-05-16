"use server";

import prisma from "@/prisma/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";

export const createArtifact = async () => {
  const artifact = await prisma.artifact.create({
    data: {
      name: "New Story",
      movie: {
        create: {}
      }
    }
  });

  redirect(`/${artifact.id}`);
};


// Get artifact from db
export const getArtifact = async (id: string) => {
  const artifact = await prisma.artifact.findUnique({
    where: {
      id: id,
    },
    include: {
      template: true,
      movie: true,
      clips: true
    }
  });
  return artifact;
};


// Get template
export const getTemplates = async () => {
  return await prisma.template.findMany({});
};

export const updateTemplate = async ({ id, data }) => {
  console.log(id, data);
  await prisma.template.update({
    where: {
      id: id
    },
    data: data
  });

  revalidatePath(`/templates/${id}`);
};