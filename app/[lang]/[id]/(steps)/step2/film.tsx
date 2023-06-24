import { CreateFilmButton } from "@/app/components/buttons.client";
import { Film } from "@prisma/client";
import React from "react";

type Props = {
  film: Film | null;
  translation: any;
};

export default function CreateFilm({ film, translation }: Props) {
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
              {film &&
                <video width="100%" height="auto" controls>
                  <source src={film.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              }
              {!film && <div>Clip video not created.</div>}
            </div>
            <div className="col-1">
              <CreateFilmButton id={film?.clipId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
