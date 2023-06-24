import { Film } from "@prisma/client";
import { getClip } from "./clip.actions";
import prisma from "@/prisma/prisma";

export const createFilm = async (id?: string) => {
  if (!id) return;
  await prisma.film.create({
    data: {
      clipId: id
    }
  });
};