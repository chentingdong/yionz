import { BsFillChatTextFill } from "react-icons/bs";
import React from "react";

export default function MakeStory() {
  return (
    <div className="h-100 d-flex flex-column">
      <div>
        <label htmlFor="prompt">Prompt</label>
        <div className="input-group">
          <textarea
            id="prompt"
            className="form-control"
            placeholder="prompt for creating your story"
          />
          <div className="input-group-append">
            <button className="btn btn-primary form-control" title="create story">
              <BsFillChatTextFill /> Make Story
            </button><br />
            <button className="btn btn-danger form-control" title="create all">
              <BsFillChatTextFill /> Make All
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
