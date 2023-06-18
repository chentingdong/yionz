"use client";

import { deleteAudio, generateAudio, updateAudioText } from "./actions";

import { AiOutlineAudio } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
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
  const audioRef = React.useRef<any>(null);

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

  const handleDeleteAudio = async () => {
    await deleteAudio(audio.id);
    audio.url = ' ';
  };

  return (
    <div className="row">
      <div className="col-2 nav-pills">
        <div className="row pe-3">
          <button className="nav-link active py-2">
            {translation.step2Clip.audio}
          </button>
        </div>
      </div>
      <div className="col-10 row">
        <div className="col-11">
          <textarea
            className="form-control mb-2"
            rows={2}
            value={audio.text}
            onChange={() => updateAudioText(audio.clipId, audio.text)}
          />
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
        <div className="col-11">
          <audio controls className="w-100" ref={audioRef}>
            <source src={audio.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="col-1">
          <button
            className="btn text-primary"
            onClick={handleDeleteAudio}
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
      </div>
      <div className="col-1">

      </div>
    </div>
  );
}
