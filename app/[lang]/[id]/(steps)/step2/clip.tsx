import { Clip } from "@prisma/client";
import Audio from './audio';
import React from "react";
import VideoSources from "./videoSources";

export type ClipProps = { clip: Clip; };

export default function Clip({ clip }: ClipProps) {
  return (
    <div>
      <pre>{JSON.stringify(clip, null, 2)}</pre>
      {/* <Audio audio={clip.audio} /> */}
      <VideoSources clip={clip} />
    </div>
  );
}
