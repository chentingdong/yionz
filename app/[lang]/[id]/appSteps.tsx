"use client";

import React, { useState } from "react";

import { DebounceInput } from "react-debounce-input";
import MakeMovie from "./step3/makeMovie";
import MakeStory from "./step1/makeStory";
import ShowOff from "./step4/bso";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TemplateSelect from "../templates/templateSelect";
import VideoClips from "./step2/videoClips";
import { updateName } from "./step1/actions";

export default function AppSteps({ translation, artifact, templates }) {
  const [key, setKey] = useState("step-1");

  return (
    <div className="container h-100 d-flex flex-column" id="steps">
      <div className="row my-2">
        <h4 className="text-capitalize text-nowrap col-2 my-1">
          {translation.step1Story.title}:
        </h4>
        <div className="col-4">
          <DebounceInput
            element="input"
            className="form-control"
            id="name"
            minLength={5}
            debounceTime={300}
            value={artifact.name}
            onChange={(e) => {
              updateName({
                id: artifact.id,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-4">
          <TemplateSelect templates={templates} />
        </div>
      </div>
      <Tabs
        className="d-flex justify-content-between"
        variant="pills"
        activeKey={key}
        onSelect={(k) => setKey(k || "step-1")}
      >
        <Tab
          eventKey="step-1"
          title={translation.appSteps.makeStory}
          className="h-100"
        >
          <MakeStory artifact={artifact} translation={translation} />
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
