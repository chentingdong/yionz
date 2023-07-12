"use client";

import { ArtifactWithRelations } from "./page";
import { DebounceInput } from "react-debounce-input";
import React from "react";
import { initClips } from "../step2/clip.actions";
import { updateStory } from "./actions";
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/i18n.client';

type Props = {
  lang: string;
  artifact: ArtifactWithRelations;
  translation: any;
};

const Story = ({ lang, translation, artifact }: Props) => {
  const router = useRouter();
  const { t } = useTranslation(lang)

  const initializeClips = async () => {
    await initClips(artifact.id);
    router.push(`/${lang}/${artifact.id}/step2`);
  };


  return (
    <>
      <div className="flex-grow-1 d-flex flex-column my-2">
        <label htmlFor="story">{t('step1Story.story')}:</label>
        <DebounceInput
          element="textarea"
          id="story"
          className="form-control flex-grow-1"
          minLength={5}
          debounceTimeout={300}
          value={artifact?.story || ""}
          onChange={(e) =>
            updateStory({
              id: artifact.id,
              story: e.target.value,
            })
          }
        />
      </div>
      <div className="d-flex flex-row-reverse my-2">
        <button
          className="btn btn-primary"
          onClick={initializeClips}
        >
          {t('step1Story.btnNextStep')}
        </button>
      </div>
    </>
  );
};

export default Story;