import { Prisma, Template } from "@prisma/client";

import CreateAudio from "./audio";
import { ImVideoCamera } from "react-icons/im";
import React from "react";
import VideoSourceSelect from "./videoSourceSelect";

export type ClipWithRelationships = Prisma.ClipGetPayload<{
  include: {
    audio: true;
    video: true;
    images: true;
    film: true;
    videoSource: true;
  };
}>;

type Props = {
  clip: ClipWithRelationships;
  template: Template;
  translation: any;
};

export default function EditClip({ clip, template, translation }: Props) {
  return (
    <div>
      {/* <pre>{JSON.stringify(clip, null, 2)}</pre> */}
      <CreateAudio
        audio={clip.audio}
        artifactId={clip.artifactId}
        translation={translation}
      />
      <hr />
      <VideoSourceSelect
        clip={clip}
        template={template}
        translation={translation}
      />
      <hr />
      <div className="row">
        <div className="col-11">&nbsp;</div>
        <div className="col-1">
          <button
            className="btn btn-primary rounded-circle p-0"
            style={{ width: "2em", height: "2em" }}
            title="Create video based on audio and active video source."
          >
            <ImVideoCamera />
          </button>
        </div>
      </div>
    </div>
  );
}
