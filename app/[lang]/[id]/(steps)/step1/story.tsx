"use client";

import { Artifact } from "@prisma/client";
import { DebounceInput } from "react-debounce-input";
import React from "react";
import { initClips } from "../step2/actions";
import { updateStory } from "./actions";

type Props = {
  artifact: Artifact;
  translation: any;
};

const Story = ({ translation, artifact }: Props) => {
  const initializeClips = async () => {
    await initClips(artifact.id);
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
      <div className="d-flex flex-row-reverse">
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