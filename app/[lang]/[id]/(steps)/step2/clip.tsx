import { Prisma, Template } from "@prisma/client";

import CreateAudio from "./audio";
import CreateFilm from "./film";
import React from "react";
import VideoSourceSelect from "./videoSourceSelect";

export type ClipWithRelationships = Prisma.ClipGetPayload<{
  include: {
    audio: true,
    video: true,
    animation: true,
    images: true,
    film: true,
  };
}>;

type Props = {
  clip?: ClipWithRelationships;
  template: Template;
  translation: any;
};

export default function EditClip({ clip, template, translation }: Props) {
  if (!clip) return <div>Clip not created.</div>;
  return (
    <div>
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
      <CreateFilm clip={clip} translation={translation} />
    </div>
  );
}
