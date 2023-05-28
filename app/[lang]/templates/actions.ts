"use server";

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
    data: data
  });

  revalidatePath(`/templates/${data.id}`);
};
