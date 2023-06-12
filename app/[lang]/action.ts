"use server";

import prisma from "@/prisma/prisma";
import { redirect } from 'next/navigation';

export const createArtifact = async () => {
  const defaultTemplate = await prisma.template.findUnique({
    where: {
      name: 'default',
    }
  });
  const artifact = await prisma.artifact.create({
    data: {
      name: "New Story",
      clips: {
      },
      movie: {
        create: {}
      },
      template: {
        connect: {
          id: defaultTemplate?.id
        }
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
      clips: {
        include: {
          audio: true,
          video: true,
          animation: true,
          image: true
        }
      }
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

