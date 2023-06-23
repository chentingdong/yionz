"use client";

import { deleteAudio, generateAudio, updateAudioText } from "./actions";

import ActionButton from "@/app/components/buttons.action";
import { Audio } from "@prisma/client";
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

  const handleDeleteAudio = async (id: string) => {
    await deleteAudio(id);
    audio.url = ' ';
  };

  return (
    <div className="row">
      <div className="col-2 nav-pills">
        <div className="row pe-3">
          <button className="nav-link active py-2">
            {translation.step2Clip?.audio}
          </button>
        </div>
      </div>
      <div className="col-10">
        <div className="row">

          <div className="col-11">
            <textarea
              className="form-control mb-2"
              rows={2}
              value={audio.text}
              onChange={() => updateAudioText(audio.clipId, audio.text)}
            />
          </div>
          <div className="col-1">
            <ActionButton
              title="Create audio based on text."
              onClick={handleGenerateAudio}
              action="create"
              loading={loading}
            />
          </div>
          <div className="col-11">
            <audio controls className="w-100" ref={audioRef}>
              <source src={audio.url || " "} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="col-1">
            <ActionButton
              action="delete"
              title="Create audio based on text."
              onClick={() => handleDeleteAudio(audio.id)}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
