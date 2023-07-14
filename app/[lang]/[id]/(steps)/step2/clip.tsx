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

export type ClipProps = {
  lang: string;
  clip: ClipWithRelationships;
  template?: Template;
};

export default function EditClip({ lang, clip, template }: Props) {
  if (!clip) return <div>Clip not created.</div>;
  return (
    <div>
      <CreateAudio
        lang={lang}
        clip={clip}
        artifactId={clip.artifactId}
      />
      <hr />
      <VideoSourceSelect
        lang={lang}
        clip={clip}
        template={template}
      />
      <hr />
      <CreateFilm clip={clip} lang={lang} />
    </div>
  );
}
