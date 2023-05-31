"use client";

import { makeStory, updatePrompt } from "./actions";

import { Artifact } from "@prisma/client";
import { BsFillChatTextFill } from "react-icons/bs";
import { DebounceInput } from "react-debounce-input";
import React from "react";

export default function Prompt({ artifact, translation }: Props) {
  return (
    <div>
      <label htmlFor="prompt">{translation.step1Story.prompt}:</label>
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
            onClick={(e) =>
              makeStory({
                id: artifact.id,
              })
            }
          >
            <BsFillChatTextFill /> {translation.step1Story.btnMakeStory}
          </button>
          <br />
          <button className="btn btn-danger form-control" title="create all">
            <BsFillChatTextFill /> {translation.step1Story.btnMakeAll}
          </button>
        </div>
      </div>
    </div>
  );
}
