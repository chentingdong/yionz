"use server";

import prisma from "@/prisma/prisma";
import { redirect } from 'next/navigation';

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


// GET all artifacts from db
export const getArtifacts = async () => {
  const artifacts = await prisma.artifact.findMany({
    include: {
      user: false,
      template: true,
      movie: true,
      clips: true,
      _count: true
    }
  });
  return artifacts;
};

