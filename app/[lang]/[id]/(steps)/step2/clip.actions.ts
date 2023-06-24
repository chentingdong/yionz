"use server";

import { createAnimation, updateAnimationPrompt } from "./animation.actions";
import { createAudio, updateAudioText } from "./audio.actions";

import { Clip } from "@prisma/client";
import { createVideo } from "./video.actions";
import { getArtifact } from "@/app/[lang]/action";
import prisma from "@/prisma/prisma";

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

// export const initClip = async (
//   artifactId: string,
//   index: number,
//   text: string
// ) => {
//   let clip0 = await prisma.clip.findUnique({
//     where: {
//       artifactId_order: {
//         artifactId: artifactId,
//         order: index,
//       },
//     },
//   });

//   if (!clip0) clip0 = await createClip(artifactId, index);
//   updateClipText({ clip: clip0, text });
// };

const initClip = async (
  artifactId: string,
  index: number,
  text: string
): Promise<Clip> => {
  try {
    const clip = await prisma.clip.upsert({
      where: {
        artifactId_order: {
          artifactId: artifactId,
          order: index,
        },
      },
      create: {
        order: index,
        artifact: { connect: { id: artifactId, } },
      },
      update: {
        order: index,
        artifact: { connect: { id: artifactId, } },
      },
    });

    return clip;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const getClip = async (id: string): Promise<Clip | null> => {
  const clip = await prisma.clip.findFirst({
    where: {
      id: id
    }
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


