import { BsFillChatTextFill } from "react-icons/bs";
import React from "react";

type Props = {};

export default function MakeStory({ }: Props) {
  return (
    <div className="h-100 d-flex flex-column">
      <div>
        <label htmlFor="prompt">Prompt</label>
        <div className="input-group">
          <input
            id="prompt"
            className="form-control"
            placeholder="prompt for creating your story"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" title="create story">
              <BsFillChatTextFill />
            </button>
            <button className="btn btn-danger" title="create all">
              <BsFillChatTextFill />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow-1 d-flex flex-column">
        <label htmlFor="story">Story</label>
        <textarea
          id="story"
          className="form-control flex-grow-1 my-2"
        />
      </div>
    </div>
  );
}
