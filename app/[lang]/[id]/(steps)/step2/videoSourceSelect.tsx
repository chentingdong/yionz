"use client";

import { Nav, Tab } from "react-bootstrap";

import CreateVideo from "./video";
import { Prisma } from "@prisma/client";
import React from "react";

type Props = {
  clip: Prisma.Clip;
  template: Template;
  translation: any;
};

export default function VideoSourceSelect({
  clip,
  template,
  translation,
}: Props) {
  return (
    <div className="row">
      <div
        className="col-2 nav flex-column nav-pills"
        id={`${clip.id}-tab`}
        role="tablist"
        aria-orientation="vertical"
      >
        <button
          className="nav-link active"
          id={`${clip.id}-video-tab`}
          data-bs-toggle="pill"
          data-bs-target={`#${clip.id}-video`}
          type="button"
          role="tab"
          aria-controls={`${clip.id}-video`}
          aria-selected="true"
        >
          {translation.step2Clip.video}
        </button>
        <button
          className="nav-link"
          id={`${clip.id}-images-tab`}
          data-bs-toggle="pill"
          data-bs-target={`#${clip.id}-images`}
          type="button"
          role="tab"
          aria-controls={`${clip.id}-images`}
          aria-selected="false"
        >
          {translation.step2Clip.images}
        </button>
        <button
          className="nav-link"
          id={`${clip.id}-animation-tab`}
          data-bs-toggle="pill"
          data-bs-target={`#${clip.id}-animation`}
          type="button"
          role="tab"
          aria-controls={`${clip.id}-animation`}
          aria-selected="false"
        >
          {translation.step2Clip.animation}
        </button>
      </div>
      <div className="col-10 tab-content" id={`${clip.id}-tabContent`}>
        <div
          className="tab-pane fade show active"
          id={`${clip.id}-video`}
          role="tabpanel"
          aria-labelledby={`${clip.id}-video-tab`}
        >
          <CreateVideo
            video={clip.video}
            template={template}
            translation={translation}
          />
        </div>
        <div
          className="tab-pane fade"
          id={`${clip.id}-images`}
          role="tabpanel"
          aria-labelledby={`${clip.id}-images-tab`}
        >
          Images
        </div>
        <div
          className="tab-pane fade"
          id={`${clip.id}-animation`}
          role="tabpanel"
          aria-labelledby={`${clip.id}-animation-tab`}
        >
          Animation
        </div>
      </div>
    </div>
  );
}
