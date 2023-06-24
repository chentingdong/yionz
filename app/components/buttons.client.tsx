"use client";

import { createArtifact, deleteArtifact } from "../[lang]/action";

import ActionButton from "./buttons.action";
import { createFilm } from "../[lang]/[id]/(steps)/step2/film.actions";
import { createTemplate } from "../[lang]/templates/actions";

// Called from server component
export function DeleteArtifact({ id }: { id: string; }) {
  return <ActionButton action="delete" onClick={() => deleteArtifact(id)} />;
};

export function CreateArtifact() {
  return <ActionButton action="create" onClick={() => createArtifact()} />;
};

export function CreateTemplate() {
  return <ActionButton action="create" onClick={() => createTemplate()} />;
}

export function CreateFilmButton({ id }: { id?: string; }) {
  return <ActionButton action="create" onClick={() => createFilm()} />;
}