"use client";

import React, { useState } from "react";

import MakeMovie from "./step3Movie";
import MakeStory from "./step1Story";
import ShowOff from "./step4BSO";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VideoClips from "./step2Clips";
import { getArtifact } from "./server";

export default function AppSteps({ translation, artifact }) {
  const [key, setKey] = useState('step-1');
  return (
    <div className="h-100 d-flex flex-column" id="steps" >
      <label className="text-capitalize"><b>{translation.step1Story.title}:</b></label>
      <Tabs
        className="d-flex justify-content-between"
        variant="pills"
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="step-1" title={translation.appSteps.makeStory} className="h-100">
          <MakeStory translation={translation} />
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
      </Tabs>
    </div>
  );
}


