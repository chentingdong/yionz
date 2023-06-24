"use client";

import ActionButton from "@/app/components/buttons.action";
import { Film } from "@prisma/client";
import React from "react";
import { createFilm } from "./film.actions";

type Props = {
  film: Film | null;
  translation: any;
};

export default function CreateFilm({ film, translation }: Props) {
  if (!film) return <div>Film not created</div>;
  return (<div>
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
            <video width="100%" height="auto" controls>
              <source src={film?.url || " "} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="col-1">
            <ActionButton action="create" />
          </div>
        </div>
      </div>
    </div>
  </div>);
}
