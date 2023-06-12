import { Prisma, Template } from "@prisma/client";

import CreateAudio from './audio';
import React from "react";
import VideoSourceSelect from "./videoSourceSelect";

type Props = {
  clip: Prisma.Clip;
  template: Template;
  translation: any;
};
export default function EditClip({ clip, template, translation }: Props) {
  return (
    <div>
      {/* <pre>{JSON.stringify(clip, null, 2)}</pre> */}
      <CreateAudio audio={clip.audio} translation={translation} />
      <hr />
      <VideoSourceSelect clip={clip} template={template} translation={translation} />
    </div>
  );
}
