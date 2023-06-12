"use client";

import { Artifact, Prisma, Template } from "@prisma/client";

import { DebounceInput } from "react-debounce-input";
import React from "react";
import TemplatesSelect from "@/app/[lang]/templates/templatesSelect";
import { updateName } from "./actions";

type ArtifactWithRelations = Prisma.ArtifactGetPayload<{
  include: { template: true; };
}>;


type Props = {
  translation: any;
  artifact: ArtifactWithRelations;
  templates: Template[];
};


export default function Headline({ translation, artifact, templates }: Props) {
  if (!artifact.id) return <></>;
  return (
    <div className="row my-2">
      <div className="col-4">
        <label>name:</label>
        <DebounceInput
          element="input"
          className="form-control"
          id="name"
          minLength={5}
          debounceTimeout={300}
          value={artifact.name}
          onChange={(e) => {
            updateName({
              id: artifact.id,
              name: e.target.value,
            });
          }}
        />
      </div>
      <div className="col-4">
        <label>template:</label>
        <TemplatesSelect
          id={artifact.id}
          templates={templates}
          selected={artifact.template}
        />
      </div>
    </div>
  );
}