"use server";

import { Template } from "@prisma/client";
import { getArtifact } from "../action";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

// Get template
export const getTemplates = async () => {
  return await prisma.template.findMany({}) || [];
};

export const updateTemplate = async (data) => {
  await prisma.template.update({
    where: {
      id: data.id
    },
    data: {
      ...data, width: parseInt(data.width), height: parseInt(data.height)
    }
  });

  revalidatePath(`/templates/${data.id}`);
};

export const getArtifactTemplate = async (id: string): Promise<Template | null> => {
  const artifact = await getArtifact(id);
  return artifact?.template || null;
};

export const createTemplate = async () => {
  const defaultTemplate = await prisma.template.findUnique({
    where: {
      name: 'default',
    }
  });

  await prisma.template.create({
    data: {
      name: "New Template",
      width: 768,
      height: 512,
      instructions: defaultTemplate?.instructions || {},
      params: defaultTemplate?.params || {}
    }
  });

  revalidatePath("/templates");
};

export const deleteTemplate = async (id: string) => {
  await prisma.template.delete({
    where: {
      id: id
    }
  });
  revalidatePath("/templates");
};