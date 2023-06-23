"use client";

import { createArtifact, deleteArtifact } from "../[lang]/action";

import ActionButton from "./buttons.action";

// Called from server component
export function DeleteArtifact({ id }: { id: string; }) {
  return <ActionButton action="delete" onClick={() => deleteArtifact(id)} />;
};

export function CreateArtifact() {
  return <ActionButton action="create" onClick={() => createArtifact()} />;
};