"use client";

import ActionButton from "@/app/components/buttons.action";
import { ClipWithRelationships } from "./clip";
import React from "react";
import { generateFilm } from "./film.actions";

type Props = {
  clip: ClipWithRelationships;
  translation: any;
};

export default function CreateFilm({ clip, translation }: Props) {
  const film = clip.film;
  const [loading, setLoading] = React.useState(false);
  const handleGenerateFilm = async () => {
    setLoading(true);
    await generateFilm(clip);
    setLoading(false);
  };
  const filmRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (filmRef.current) {
      filmRef.current.load();
      filmRef.current.play();
      filmRef.current.pause();
    }
  }, [film?.url]);
  return (
    <div>
      {/* <pre>{JSON.stringify(clip, null, 2)}</pre> */}
      <div className="row">
        <div className="col-2 nav-pills">
          <div className="row pe-3">
            <button className="nav-link active py-2 opacity-75 disabled">
              {translation.step2Clip?.film}
            </button>
          </div>
        </div>
        <div className="col-10">
          <div className="row">
            <div className="col-1">&nbsp;</div>
            <div className="col-10">
              {film?.url &&
                <video width="100%" height="auto" controls>
                  {film?.url && <source src={film?.url + '?' + Date.now()} type="video/mp4" /> }
                  {!film?.url && <source src=" " type="video/mp4" /> }
                  Your browser does not support the video tag.
                </video>
              }
              {!film?.url && <div>Clip video not created.</div>}
            </div>
            <div className="col-1">
              <ActionButton action="create" onClick={handleGenerateFilm} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
