import { Film } from "@prisma/client";
import { getClip } from "./clip.actions";
import prisma from "@/prisma/prisma";

export const createFilm = async (clipId: string): Promise<Film> => {
  const film = await prisma.film.create({
    data: {
      clipId: clipId
    }
  });
  return film;
};