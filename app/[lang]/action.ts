"use server";

import { ArtifactWithRelations } from "./[id]/(steps)/step1/page";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { getServerSession } from 'next-auth/next';
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export const createArtifact = async () => {
  const session = await getServerSession(authOptions);
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
      },
      user: {
        connect: {
          id: session.user.id
        }
      }
    }
  });

  revalidatePath(artifact.id);
};


// Get one artifact from db
export const getArtifact = async (id: string): Promise<ArtifactWithRelations | null> => {
  const artifact = await prisma.artifact.findUnique({
    where: {
      id: id,
    },
    include: {
      template: true,
      movie: true,
      clips: {
        orderBy: { order: "asc" },
        include: {
          audio: true,
          video: true,
          animation: true,
          film: true,
          images: {
            orderBy: { order: "asc" },
          },
        }
      }
    }
  });

  return artifact;
};

// Delete artifact by id
export const deleteArtifact = async (id: string) => {
  await prisma.artifact.delete({
    where: {
      id: id
    }
  });
  revalidatePath(id);
};

// GET all artifacts from db
export const getArtifacts = async () => {
  const session = await getServerSession(authOptions);
  const artifacts = await prisma.artifact.findMany({
    where: {
      userId: session?.user.id
    },
    include: {
      user: false,
      template: true,
      movie: true,
      clips: {
        include: {
          audio: true,
          video: true,
          animation: true,
          images: true
        }
      },
      _count: true
    }
  });
  return artifacts;
};

