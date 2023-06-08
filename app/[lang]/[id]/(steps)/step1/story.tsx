"use client";

import { Artifact } from "@prisma/client";
import { DebounceInput } from "react-debounce-input";
import { Locale } from "@/i18n/i18n-config";
import React from "react";
import { initClips } from "../step2/actions";
import { redirect } from "next/navigation";
import { updateStory } from "./actions";
import { useRouter } from 'next/navigation';

type Props = {
  lang: Locale;
  artifact: Artifact;
  translation: any;
};

const Story = ({ lang, translation, artifact }: Props) => {
  const router = useRouter();

  const initializeClips = async () => {
    await initClips(artifact.id);
    router.push(`/${lang}/${artifact.id}/step2`);
  };


  return (
    <>
      <div className="flex-grow-1 d-flex flex-column my-2">
        <label htmlFor="story">{translation.step1Story.story}:</label>
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
          onClick={() => initializeClips()}
        >
          {translation.step1Story.btnNextStep}
        </button>
      </div>
    </>
  );
};

export default Story;