"use client";

import MakeMovie from "./step3Movie";
import MakeStory from "./step1Story";
import React from "react";
import ShowOff from "./step4BSO";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VideoClips from "./step2Clips";

export default function AppSteps({ translation }) {
  return (
    <Tabs
      className="d-flex justify-content-between"
      variant="pills"
      activeKey='step-1'
    >
      <Tab eventKey="step-1" title={translation.appSteps.makeStory}>
        <MakeStory />
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
  );
}
