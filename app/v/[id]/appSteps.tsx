"use client";

import React, { useState } from "react";

import MakeMovie from "./step3Movie";
import MakeStory from "./step1Story";
import ShowOff from "./step4BSO";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VideoClips from "./step2Clips";

export default function AppSteps() {
  const [key, setKey] = useState('step-1');
  return (
    <Tabs
      className="d-flex justify-content-between"
      variant="pills"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="step-1" title="1: make story" className="flex-grow-1">
        <MakeStory />
      </Tab>
      <Tab eventKey="step-2" title="2: video clips">
        <VideoClips />
      </Tab>
      <Tab eventKey="step-3" title="3: make movie">
        <MakeMovie />
      </Tab>
      <Tab eventKey="step-4" title="4: BSO">
        <ShowOff />
      </Tab>
    </Tabs>
  );
}
