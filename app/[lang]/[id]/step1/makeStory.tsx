"use client";

import { makeStory, updatePrompt, updateStory } from "./actions";

import { BsFillChatTextFill } from "react-icons/bs";
import { DebounceInput } from "react-debounce-input";
import React from "react";
import { initClips } from "../step2/actions";

export default function MakeStory({ translation, artifact }) {
  return (
    <div className="h-100 d-flex flex-column">
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
      <div className="d-flex justify-content-right">
        <button
          className="btn btn-primary"
          onClick={(e) => initClips(artifact.id)}
        >
          {translation.step1Story.btnNextStep}
        </button>
      </div>
    </div>
  );
}
