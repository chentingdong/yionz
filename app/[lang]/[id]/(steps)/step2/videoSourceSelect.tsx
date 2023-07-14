"use client";

import CreateAnimation from "./animation";
import CreateImages from "./images";
import CreateVideo from "./video";
import React from "react";
import { updateClip } from "./clip.actions";
// import { useTranslation } from '@/i18n/i18n.client';
import { useTranslation } from "next-i18next";
import {ClipProps} from './clip';

export default function VideoSourceSelect({ lang, clip, template }: ClipProps) {
  let active = clip.videoSource;
  const { t } = useTranslation(lang)

  const setVideoSource = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    videoSource: string
  ) => {
    e.preventDefault();
    await updateClip({ id: clip.id, videoSource: videoSource });
  };

  const tabs = [
    {
      nav: "video",
      content: "CreateVideo",
    },
    {
      nav: "images",
      content: "CreateImages",
    },
    {
      nav: "animation",
      content: "Animation",
    },
  ];

  const ContentComponent = (nav: string) => {
    switch (nav) {
      case "video":
        return (
          <CreateVideo lang={lang} clip={clip} />
        );
      case "images":
        return (
          <CreateImages
            clip={clip}
            lang={lang}
            template={template}
          />
        );
      case "animation":
        return (
          <CreateAnimation lang={lang} clip={clip} />
        );
      default:
        return <div>Building</div>;
    }
  };
  return (
    <div className="row">
      <div
        className="col-2 nav flex-column nav-pills"
        id={`${clip.id}-tab`}
        role="tablist"
        aria-orientation="vertical"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`nav-link ${tab.nav === active ? "active" : ""}`}
            id={`${clip.id}-${tab.nav}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#${clip.id}-${tab.nav}`}
            type="button"
            role="tab"
            aria-controls={`${clip.id}-${tab.nav}`}
            aria-selected={active === tab.nav}
            onClick={(e) => setVideoSource(e, tab.nav)}
          >
            {t(`step2Clip.${tab.nav}`)}
          </button>
        ))}
      </div>
      <div className="col-10 tab-content" id={`${clip.id}-tabContent`}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-pane fade show ${tab.nav === active ? "active" : ""
              }`}
            id={`${clip.id}-${tab.nav}`}
            role="tabpanel"
            aria-labelledby={`${clip.id}-${tab.nav}-tab`}
          >
            {ContentComponent(tab.nav)}
          </div>
        ))}
      </div>
    </div>
  );
}
