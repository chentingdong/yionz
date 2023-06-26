"use server";

import { s3, s3Upload } from "@/app/api/services/s3";

import { ClipWithRelationships } from "./clip";
import { Converter } from "ffmpeg-stream";
import { Film } from "@prisma/client";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

const dir = '/app/public/data';

export const createFilm = async (clipId: string) => {
  await prisma.film.upsert({
    where: {
      clipId: clipId,
    },
    create: {
      clipId: clipId,
    },
    update: {
      clipId: clipId,
    },
  });
};

export const updateFilm = async (film: Film) => {
  await prisma.film.update({
    where: {
      clipId: film.clipId,
    },
    data: film,
  });
};

export const generateFilm = async (clip?: ClipWithRelationships) => {
  if (!clip || !clip.audio || !clip.images) return;
  let video = "";

  // if videoSource is images, generate a gif as video.
  if (clip.videoSource === "images" && clip.images.length > 0)
    video = await imagesToVideo(clip);
  else if (clip.videoSource === 'video')
    video = clip.video?.url as string;
  else if (clip.videoSource === 'animation')
    video = clip.animation?.url as string;

  // combine video and audio to film
  let output = await combineAudioVideo(clip, video);
  if (!output) return;

  try {
    const url = await s3Upload({
      fileBuffer: fs.readFileSync(output),
      filename: output,
      artifactId: clip.artifactId,
      clipId: clip.id,
    });

    await updateFilm({ ...(clip.film as Film), url: url });
  } catch (err) {
    throw err;
  }
  revalidatePath(`/${clip.artifactId}`);
};

const combineAudioVideo = async (
  clip: ClipWithRelationships,
  video: string
): Promise<string | null> => {
  console.log("Creating clip film...");
  if (!clip || !clip.audio || !clip.images) return null;

  // Delete if exist, it doesn't overwrite.
  const output = `${dir}/${clip.id}.clip.mp4`;
  if (fs.existsSync(output)) fs.unlinkSync(output);

  try {
    let command = ffmpeg();

    // add audio
    return new Promise((resolve, reject) => {
      command
        .input(clip.audio?.url || " ")
        .input(video)
        .audioCodec("libmp3lame")
        .fps(25)
        .videoCodec("libx264")
        .videoBitrate("1024k")
        .format("mp4")
        .on("error", function (err: { message: string; }) {
          console.log("An error occurred: " + err.message);
          reject(err.message);
        })
        .on("end", function (err: { message: string; }) {
          if (err) {
            console.log("An error occurred: " + err.message);
            reject(err.message);
          } else {
            console.log(`Successfully create clip film as stream`);
          }
          resolve(output);
        })
        .save(output);
    });
  } catch (err) {
    throw err;
  }
};

const imagesToVideo = async (clip: ClipWithRelationships) => {
  // Delete if exist, it doesn't overwrite.
  const output = `${dir}/${clip.id}.gif.mp4`;
  if (fs.existsSync(output)) fs.unlinkSync(output);

  const duration = clip.audio?.duration || clip.images.length;

  const converter = new Converter();
  const input = converter.createInputStream({
    f: "image2pipe",
    framerate: clip.images.length / duration
  });
  converter.createOutputToFile(output, {
    vcodec: "libx264",
    pix_fmt: "yuv420p",
  });
  const finished = converter.run();

  // pipe all the frames to the converter sequentially
  for (let i = 0; i < clip.images.length; i++) {
    const image = clip.images[i];
    console.log(`processing image ${image.order} ...`);
    // create a promise for every frame and await it
    await new Promise((resolve, reject) => {
      const bucket = "yionz";
      const keyPath = new URL(image.url).pathname.substring(1);
      s3.getObject({ Bucket: bucket, Key: keyPath })
        .createReadStream()
        .on("end", resolve)
        .on("error", reject)
        .pipe(input, { end: i === clip.images.length - 1 });
    });
  }
  await finished;
  return output;
};
