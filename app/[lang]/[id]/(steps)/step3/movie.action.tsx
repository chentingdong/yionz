"use server";

import { getArtifact } from "@/app/[lang]/action";
import ffmpeg from "fluent-ffmpeg";
import { s3Upload } from "@/app/api/services/s3";
import fs from "fs";
import prisma from "@/prisma/prisma";

const dir = "/app/public/data";

export const generateMovie = async (artifactId: string) => {
  const artifact = await getArtifact(artifactId);
  const output = `${dir}/${artifactId}.movie.mp4`;

  if (!artifact) return;

  const command = ffmpeg();
  console.log("generating movie...");

  for (let i = 0; i < artifact.clips.length; i++) {
    const clip = artifact.clips[i];
    if (clip.film?.url) command.input(clip.film.url);
  }

  command
    .on("error", (e) => console.log(`Error generating movie, ${e}`))
    .on("end", () => console.log('Succeefully generatd movie'))
    .mergeToFile(output, dir)

  await saveMovie(artifactId, output);
};

const saveMovie = async (artifactId: string, output: string) => {
  console.log("saving movie...");

  const url = await s3Upload({
    fileBuffer: fs.readFileSync(output),
    filename: output,
    artifactId: artifactId,
  });

  await prisma.movie.upsert({
    where: {
      artifactId: artifactId,
    },
    create: {
      artifactId: artifactId,
      url: url,
    },
    update: {
      artifactId: artifactId,
      url: url,
    },
  });
};
