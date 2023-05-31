"use client";

import React, { useState } from "react";

import { DebounceInput } from "react-debounce-input";
import MakeMovie from "./(steps)/step3/makeMovie";
import MakeStory from "./(steps)/step1/page";
import ShowOff from "./step4/bso";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import VideoClips from "./(steps)/step2/videoClips";

type PageProps = {
  params: {
    lang: Locale,
    id: string,
    step: string,
  };
};

export default function AppSteps({ translation, artifact, templates }) {
  const [key, setKey] = useState("step-1");

  return (
    <div className="container h-100 d-flex flex-column" id="steps">
      <h4 className="text-capitalize text-nowrap col-2 my-1">
        {translation.step1Story.title}:
      </h4>
      <nav
        className="d-flex justify-content-between"
      >
        <Tab
          eventKey="step-1"
          title={translation.appSteps.makeStory}
          className="h-100"
        >
          {/* <MakeStory artifact={artifact} translation={translation} templates={templates} setKey={setKey} /> */}
        </Tab>
        <Tab eventKey="step-2" title={translation.appSteps.videoClips}>
          <VideoClips />
        </Tab>
        <Tab eventKey="step-3" title={translation.appSteps.makeMovie}>
          <MakeMovie />
        </Tab>
        <Tab eventKey="step-4" title={translation.appSteps.bso}>
          <ShowOff />
        </Tab>
      </nav>
    </div>
  );
}
