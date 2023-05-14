import { BsFillChatTextFill } from "react-icons/bs";
import React from "react";

export default function MakeStory({ translation }) {
  return (
    <div className="h-100 d-flex flex-column">
      <div>
        <label htmlFor="prompt">{translation.step1Story.prompt}:</label>
        <div className="input-group">
          <textarea
            id="prompt"
            className="form-control"
            placeholder="prompt for creating your story"
          />
          <div className="input-group-append">
            <button className="btn btn-primary form-control" title="create story">
              <BsFillChatTextFill /> {translation.step1Story.btnMakeStory}
            </button><br />
            <button className="btn btn-danger form-control" title="create all">
              <BsFillChatTextFill /> {translation.step1Story.btnMakeAll}
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow-1 d-flex flex-column my-2">
        <label htmlFor="story">{translation.step1Story.story}:</label>
        <textarea
          id="story"
          className="form-control flex-grow-1"
        />
      </div>
    </div>
  );
}
