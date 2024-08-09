"use client";

import { deleteAudio, generateAudio, updateAudioText } from "./audio.actions";

import ActionButton from "@/app/components/buttons.action";
import { useTranslation } from '@/i18n/i18n.client';
import React from "react";
import { ClipWithRelationships } from './clip';

type Props = {
  lang: string;
  artifactId: string;
  clip: ClipWithRelationships;
};

export default function CreateAudio({lang, clip }: Props) {
  const audio = clip.audio;
  const [loading, setLoading] = React.useState(false);
  const audioRef = React.useRef<any>(null);
  const { t } = useTranslation(lang)

  // React.useEffect(() => {
    // const audioRef = React.useRef<any>(null);
    //   if (audioRef.current) {
  //     audioRef.current.load();
  //     audioRef.current.play();
  //     audioRef.current.pause();
  //   }
  // }, [audio]);

  const handleGenerateAudio = async () => {
    setLoading(true);
    if (!audio) return;
    try {
      const url = await generateAudio({
        audio: audio,
        artifactId: clip.artifactId,
      });
      audio.url = url;
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDeleteAudio = async (id?: string) => {
    if (!id || !audio) return;
    await deleteAudio(id);
    audio.url = ' ';
  };

  return (
    <div className="row">
      <div className="col-2 nav-pills">
        <div className="row pe-3">
          <button className="nav-link active py-2 opacity-75 disabled">
            {t('step2Clip.audio')}
          </button>
        </div>
      </div>
      <div className="col-10">
        <div className="row">
          <div className="col-11">
            <textarea
              className="form-control mb-2"
              rows={2}
              value={audio?.text}
              onChange={() => updateAudioText(audio?.clipId, audio?.text)}
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
            {audio?.url && 
              <audio controls className="w-100" ref={audioRef}>
                <source src={audio?.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            }
            {!audio?.url && <div>No audio</div>}
          </div>
          <div className="col-1">
            {audio?.url &&
              <ActionButton
                action="delete"
                title="Create audio based on text."
                onClick={() => handleDeleteAudio(audio?.id)}
              />
            }
          </div>
        </div>
      </div>

    </div>
  );
}
