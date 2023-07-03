"use server";

import { Audio, Prisma, Template } from "@prisma/client";
import { s3Delete, s3Upload } from "@/app/api/services/s3";
import fs from "fs";

import { getArtifactTemplate } from "@/app/[lang]/templates/actions";
import prisma from "@/prisma/prisma";
import { textToSpeechPolly } from "@/app/api/services/polly";
import mp3Duration from "mp3-duration";

export const createAudio = async (clipId: string): Promise<Audio> => {
  const audio = await prisma.audio.create({
    data: {
      clipId: clipId
    }
  });
  return audio;
};

export const updateAudioText = async (clipId?: string, text?: string) => {
  if (!clipId || !text) return;
  await prisma.audio.upsert({
    where: {
      clipId: clipId,
    },
    create: {
      clipId: clipId,
      text: text
    },
    update: {
      text: text,
    },
  });
};

export const generateAudio = async ({
  audio,
  artifactId,
}: {
  audio: Audio;
  artifactId: string;
}): Promise<string> => {

  const template = await getArtifactTemplate(artifactId);
  if (!template) return '';
  const pollyParams = getVoiceParams(template);

  try {
    const filename = 'audio.mp3';
    const audioStream = await textToSpeechPolly(audio.text, pollyParams);
    const url: string = await s3Upload({
      fileBuffer: audioStream,
      filename: filename,
      artifactId: artifactId,
      clipId: audio.clipId
    });

    const duration = Math.round(await mp3Duration(audioStream));

    await prisma.audio.update({
      where: {
        id: audio.id
      },
      data: {
        url: url,
        duration: duration
      }
    });
    return url;
  } catch (err) {
    throw err.message;
  }
};

export const deleteAudio = async (id: string) => {
  // get audio info from db
  const audio = await prisma.audio.findUniqueOrThrow({
    where: {
      id: id
    }
  });
  if (!audio.url) return;
  try {
    // delete file from s3
    const keyPath = new URL(audio.url).pathname.substring(1);
    await s3Delete(keyPath);

    // delete image record from db
    await prisma.audio.update({
      where: {
        id: id
      },
      data: {
        url: ' '
      }
    });
  } catch (error) {
    throw error;
  }
};

// TODO: Move these to polly.ts
export type PollyParamsProps = {
  VoiceId: string;
  LanguageCode: string;
};
const getVoiceParams = (template: Template): PollyParamsProps => {
  const defaultParams = { LanguageCode: 'en-US', VoiceId: 'Amy' };
  const instructionsObject = template?.instructions as Prisma.JsonObject;
  const voice = instructionsObject.voice;
  if (voice !== 'awsPolly') {
    console.warn("Voicd not supported, use default 'Amy', please check template.");
    return defaultParams;
  }
  const paramsObject = template?.params as Prisma.JsonObject;
  const awsPolly = paramsObject.awsPolly as Prisma.JsonObject;

  return {
    VoiceId: awsPolly.VoiceId as string || 'Amy',
    LanguageCode: awsPolly.LanguageCode as string || 'en-US'
  };
};

