"use server";

import { Clip } from "@prisma/client";
import cuid from "cuid";
import { getArtifact } from "@/app/[lang]/action";
import prisma from "@/prisma/prisma";
import { updateAnimationPrompt } from "./animation.actions";
import { updateAudioText } from "./audio.actions";

/*********
 * Clip
 *********/
export const initClips = async (artifactId: string) => {
  const artifact = await getArtifact(artifactId);
  if (!artifact?.story) return;

  const clipsTexts = artifact.story.split("\n\n").filter((clipText) => {
    return clipText.length > 0;
  });

  if (!clipsTexts || clipsTexts?.length === 0) return;

  for (let i = 0; i < clipsTexts.length; i++) {
    await initClip(artifactId, i, clipsTexts[i]);
  }

  return;
};

export const initClip = async (
  artifactId: string,
  index: number,
  text: string
) => {
  const clip0 = await prisma.clip.findUnique({
    where: {
      artifactId_order: {
        artifactId: artifactId,
        order: index,
      },
    },
  });

  if (clip0) updateClipText({ clip: clip0, text });
  else createClip(artifactId, index, text);
};

const createClip = async (
  artifactId: string,
  index: number,
  text: string
): Promise<Clip> => {
  const clipId = cuid();

  const clip = await prisma.clip.create({
    data: {
      id: clipId,
      Artifact: {
        connect: {
          id: artifactId,
        },
      },
      audio: {
        create: {
          clipId: clipId,
          text: text,
        },
      },
      images: {
        create: [],
      },
      video: {
        create: {
          clipId: clipId,
        },
      },
      animation: {
        create: {
          clipId: clipId,
          prompt: text,
        },
      },
      film: {
        create: {
          clipId: clipId,
        },
      },
      order: index,
      loading: false,
    },
  });
  return clip;
};

// Partially update clip
export const updateClip = async (clip: any) => {
  await prisma.clip.update({
    where: {
      id: clip.id
    },
    data: clip
  });
};

const updateClipText = async ({
  clip, text
}: {
  clip: Clip,
  text?: string,
  videoSource?: 'video' | 'images' | 'animation';
}) => {
  if (text) {
    await updateAudioText(clip.id, text);
    await updateAnimationPrompt(clip.id, text);
  }
};


