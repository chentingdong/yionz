"use client";

import { generateAudio, updateAudio } from "./actions";

import { AiOutlineAudio } from "react-icons/ai";
import { Audio } from "@prisma/client";
import Loading from "@/app/components/loading";
import React from "react";

type Props = {
  artifactId: string;
  audio: Audio;
  translation: any;
};

export default function CreateAudio({ audio, artifactId, translation }: Props) {
  const [loading, setLoading] = React.useState(false);
  const audioRef = React.useRef<HTMLInputElemen | null>(null);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      audioRef.current.pause();
    }
  }, [audio.url]);

  const handleGenerateAudio = async () => {
    setLoading(true);
    try {
      const url = await generateAudio({
        audio: audio,
        artifactId: artifactId,
      });
      audio.url = url;
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="row">
      <div className="col-2 nav-pills nav-item">
        <div className="nav-link active my-1 py-2 px-3">
          {translation.step2Clip.audio}
        </div>
      </div>
      <div className="col-9">
        <textarea
          className="form-control mb-2"
          rows={2}
          value={audio.text}
          onChange={() => updateAudio(audio.clipId, audio.text)}
        />
        <audio controls className="w-100" ref={audioRef}>
          <source src={audio.url || " "} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="col-1">
        <button
          className="rounded-circle btn btn-primary p-0"
          style={{ width: "2em", height: "2em" }}
          title="Create audio based on text."
          onClick={handleGenerateAudio}
        >
          {!loading && <AiOutlineAudio />}
          {loading && <Loading />}
        </button>
      </div>
    </div>
  );
}
