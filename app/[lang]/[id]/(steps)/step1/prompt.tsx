"use client";

import { makeStory, updatePrompt } from "./actions";
import { Artifact } from "@prisma/client";
import { BsFillChatTextFill } from "react-icons/bs";
import { DebounceInput } from "react-debounce-input";
import React from "react";
import { useTranslation } from "next-i18next";

type Props = {
  artifact: Artifact,
  lang: string
};
export default function Prompt({ lang, artifact }: Props) {
  const { t } = useTranslation(lang)

  return (
    <div>
      <label htmlFor="prompt">{t('step1Story.prompt')}:</label>
      <div className="input-group">
        <DebounceInput
          element="textarea"
          id="prompt"
          className="form-control"
          minLength={5}
          debounceTimeout={300}
          placeholder="prompt for creating your story"
          value={artifact?.prompt}
          onChange={(e) =>
            updatePrompt({
              id: artifact.id,
              prompt: e.target.value,
            })
          }
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary form-control"
            title="create story"
            onClick={() => makeStory(artifact.id)}
          >
            <BsFillChatTextFill /> {t('step1Story.btnMakeStory')}
          </button>
        </div>
      </div>
    </div>
  );
}

