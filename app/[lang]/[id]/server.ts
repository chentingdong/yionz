"use server";

import prisma from "@/prisma/prisma";

export async function updatePrompt(appId: String) {
  return true;
}

export const getArtifact = (id: string) => {
  const artifact = prisma.artifact.findUnique({
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