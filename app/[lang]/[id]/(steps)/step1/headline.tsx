"use client";

import { Artifact, Template } from "@prisma/client";

import { DebounceInput } from "react-debounce-input";
import React from "react";
import TemplatesSelect from "@/app/[lang]/templates/templatesSelect";
import { updateName } from "./actions";

type Props = {
  translation: any;
  artifact: Artifact;
  templates: Template[];
};

export default function Headline({ translation, artifact, templates }: Props) {
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
