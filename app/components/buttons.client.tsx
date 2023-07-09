"use client";

/**
 * This file hold some client buttons that used in a server component.
 */

import { createArtifact, deleteArtifact } from "../[lang]/action";

import ActionButton from "./buttons.action";
import { createTemplate } from "../[lang]/templates/actions";
import { generateMovie } from '../[lang]/[id]/(steps)/step3/movie.action';

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
