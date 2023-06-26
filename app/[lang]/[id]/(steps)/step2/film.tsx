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
  const [loading, setLoading] = React.useState(false);
  const handleGenerateFilm = async () => {
    setLoading(true);
    await generateFilm(clip);
    setLoading(true);
  };
  return (
    <div>
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
              {clip.film?.url &&
                <video width="100%" height="auto" controls>
                  <source src={clip.film?.url || " "} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              }
              {!clip.film?.url && <div>Clip video not created.</div>}
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
