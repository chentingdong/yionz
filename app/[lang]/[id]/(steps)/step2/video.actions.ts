"use server";

import { Prisma, Video } from "@prisma/client";
import { s3Delete, s3Upload } from "@/app/api/services/s3";

import prisma from "@/prisma/prisma";
import sanitize from 'sanitize-s3-objectkey';

/***********
 * Video
 ***********/

export const uploadVideo = async (data: FormData): Promise<Video | null> => {
  const file = data.get('file') as File;
  const artifactId = data.get('artifactId')?.toString();
  const clipId = data.get('clipId')?.toString();
  if (!artifactId || !clipId || !file) return null;
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const duration = getVideoDuration(fileBuffer);

  try {
    const url = await s3Upload({
      fileBuffer: fileBuffer,
      filename: sanitize(file.name),
      artifactId: artifactId,
      clipId: clipId
    });

    const video = await prisma.video.upsert({
      where: {
        clipId: clipId
      },
      create: {
        clipId: clipId,
        url: url,
        duration: duration
      },
      update: {
        url: url,
        duration: duration
      }
    });
    return video;
  } catch (error) {
    throw error;
  }
};

const getVideoDuration = (fileBuffer: Buffer): string => {
  const header = Buffer.from("mvhd");
  const start = fileBuffer.indexOf(header) + 17;
  const timeScale = fileBuffer.readUInt32BE(start);
  const length = fileBuffer.readUInt32BE(start + 4);
  const seconds = Math.floor((length / timeScale) * 1000) / 1000;
  const duration = new Date(seconds * 1000).toISOString().substring(14, 19);

  return duration;
};

export const updateVideo = async (video: Prisma.VideoCreateInput) => {
  await prisma.video.update({
    where: {
      id: video.id
    },
    data: video
  });
};

export const deleteVideo = async (id: string) => {
  // get video info from db
  const video = await prisma.video.findUniqueOrThrow({
    where: {
      id: id
    }
  });
  if (!video.url) return;
  try {
    // delete file from s3
    const keyPath = new URL(video.url).pathname.substring(1);
    await s3Delete(keyPath);

    // delete video record from db
    await prisma.video.delete({
      where: {
        id: id
      }
    });
  } catch (error) {
    throw error;
  }
};

