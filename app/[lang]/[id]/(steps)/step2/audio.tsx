import { AiOutlineAudio } from "react-icons/ai";
import { Audio } from "@prisma/client";
import React from "react";

type Props = {
  audio: Audio;
  translation: any;
};

export default function CreateAudio({ audio, translation }: Props) {
  return (
    <div className="row">
      <div className="col-2 nav-pills nav-item">
        <div className="nav-link active my-1 py-2 px-3">
          {translation.step2Clip.audio}
        </div>
      </div>
      <div className="col-9">
        <textarea className="form-control mb-2" rows={2} value={audio.text} />
        <audio controls className="w-100">
          <source src={audio.url || " "} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="col-1">
        <button
          className="rounded-circle btn btn-primary p-0"
          style={{ width: "2em", height: "2em" }}
          title="Create audio based on text."
        >
          <AiOutlineAudio />
        </button>
      </div>
    </div>
  );
}
