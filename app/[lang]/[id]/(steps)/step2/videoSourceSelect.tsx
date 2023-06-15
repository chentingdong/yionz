"use client";

import { Nav, Tab } from 'react-bootstrap';

import CreateVideo from "./video";
import { Prisma } from "@prisma/client";
import React from "react";

type Props = {
  clip: Prisma.Clip;
  template: Template;
  translation: any;
};

export default function VideoSourceSelect({ clip, template, translation }: Props) {
  return (
    <div className="row">
      <div className="col-2 nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
          {translation.step2Clip.video}
        </button>
        <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
          {translation.step2Clip.images}
        </button>
        <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
          {translation.step2Clip.animation}
        </button>
      </div>
      <div className="col-10 tab-content" id="v-pills-tabContent">
        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
          <CreateVideo video={clip.video} template={template} translation={translation} />
        </div>
        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
          Images
        </div>
        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
          Animation
        </div>
      </div>
    </div>
  );
}
