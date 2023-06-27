"use server";

import { s3Delete, s3Upload } from "@/app/api/services/s3";

import { Image } from "@prisma/client";
import { getArtifactTemplate } from "@/app/[lang]/templates/actions";
import gm from 'gm';
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import sanitize from 'sanitize-s3-objectkey';

export const getImages = async (clipId: string): Promise<Image[]> => {
  return await prisma.image.findMany({
    where: {
      clipId: clipId
    },
    orderBy: { order: "asc" }
  });
};
export const uploadImage = async (data: FormData): Promise<Image | null> => {
  const file = data.get('file') as File;
  const artifactId = data.get('artifactId')?.toString();
  const clipId = data.get('clipId')?.toString();
  if (!artifactId || !clipId || !file) return null;

  const template = await getArtifactTemplate(artifactId);
  const fileBuffer = await processImage({ file, width: template?.width, height: template?.height });

  let order = Number(data.get('order'));

  console.log('upload params:', file.name, artifactId, clipId, order);
  try {
    const url = await s3Upload({
      fileBuffer: fileBuffer,
      filename: sanitize(file.name),
      artifactId: artifactId,
      clipId: clipId
    });

    const image = await prisma.image.create({
      data: {
        clipId: clipId,
        order: order,
        url: url
      }
    });
    revalidatePath(`${artifactId}/step2`);
    return image;
  } catch (error) {
    throw error;
  }
};

export const updateImage = async (image: Image) => {
  await prisma.image.update({
    where: {
      id: image.id
    },
    data: image
  });
};

export const deleteImage = async (id: string) => {
  // get image info from db
  const image = await prisma.image.findUniqueOrThrow({
    where: {
      id: id
    }
  });
  if (!image.url) return;

  try {
    // delete file from s3
    let keyPath = new URL(image.url).pathname.substring(1);
    await s3Delete(keyPath);

    // delete image record from db
    await prisma.image.delete({
      where: {
        id: id
      }
    });
  } catch (err) {
    throw err;
  }
};

/**
 * use graphicmagick to resize and crop image to the dimension defined by template of the artifact.
 */
const processImage = async ({ file, width, height }: {
  file: File,
  width: number | undefined,
  height: number | undefined;
}) => {
  if (!width || !height) return;

  const imageData = await file.arrayBuffer();
  return await gm(Buffer.from(imageData))
    .resize(width, height, '^')
    .gravity('Center')
    .crop(width, height)
    .stream();
};
