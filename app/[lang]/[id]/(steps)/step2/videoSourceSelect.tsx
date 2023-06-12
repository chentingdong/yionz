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
    <Tab.Container id="left-tabs-example" defaultActiveKey="video">
      <div className="row">
        <div className="col-2">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="video">{translation.step2Clip.video}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="animation">{translation.step2Clip.animation}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="images">{translation.step2Clip.images}</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="col-10">
          <Tab.Content>
            <Tab.Pane eventKey="video">
              <CreateVideo video={clip.video} template={template} translation={translation} />
            </Tab.Pane>
            <Tab.Pane eventKey="animation">Animation</Tab.Pane>
            <Tab.Pane eventKey="images">Images</Tab.Pane>
          </Tab.Content>
        </div>
      </div>
    </Tab.Container>
  );
}
