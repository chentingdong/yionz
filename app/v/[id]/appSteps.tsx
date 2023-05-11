"use client";

import React, { useState } from "react";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function AppSteps() {
  const [key, setKey] = useState('step-1');
  return (
    <Tabs
      id="controlled-tab-example"
      className="d-flex justify-content-between my-2"
      variant="pills"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="step-1" title="1: make story">
        <div>step 1</div>
      </Tab>
      <Tab eventKey="step-2" title="2: video clips">
        <div>step 2</div>
      </Tab>
      <Tab eventKey="step-3" title="3: make movie">
        <div>step 3</div>
      </Tab>
    </Tabs>
  );
}
