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
      <audio className="col-10" controls>
        <source src={audio.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
