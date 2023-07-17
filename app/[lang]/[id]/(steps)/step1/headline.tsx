"use client";

import { Artifact, Prisma, Template } from "@prisma/client";

import { ArtifactWithRelations } from "./page";
import { DebounceInput } from "react-debounce-input";
import React from "react";
import TemplatesSelect from "@/app/[lang]/templates/templatesSelect";
import { updateName } from "./actions";
import { useTranslation } from '@/i18n/i18n.client';

type Props = {
  lang: string;
  artifact: ArtifactWithRelations;
  templates: Template[];
};


export default function Headline({ lang, artifact, templates }: Props) {
  if (!artifact.id) return <></>;
  const { t } = useTranslation(lang);

  return (
    <div className="row my-2">
      <div className="col-4">
        <label>{t('step1Story.name')}:</label>
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
        <label>{t('step1Story.template')}:</label>
        <TemplatesSelect
          id={artifact.id}
          templates={templates}
          selected={artifact.template}
        />
      </div>
    </div>
  );
}
