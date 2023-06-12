import { Prisma, Video } from "@prisma/client";

import { FileUploader } from "react-drag-drop-files";
import React from "react";
import TimeRangeSlider from 'react-time-range-slider';

type Props = {
  video: Video;
  template: Prisma.Template;
  translation: any;
};

type TimeRange = {
  start: string,
  end: string;
};

export default function CreateVideo({ video, template, translation }: Props) {
  const [timeRange, setTimeRange] = React.useState<TimeRange>({ start: "0:00", end: "0:00" });
  const updateVideo = (e) => {
    console.log(e.target.value);
  };

  const fileTypes = ["MP4"];

  return (
    <div className="">
      <FileUploader
        multiple={true}
        handleChange={updateVideo}
        name="file"
        types={fileTypes}
      />
      <br />
      <video width="100%" height="auto" controls>
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <TimeRangeSlider
        disabled={false}
        format={24}
        maxValue={"23:59"}
        minValue={"00:00"}
        name={"time_range"}
        onChange={(time: TimeRange) => setTimeRange(time)}
        step={15}
        value={timeRange} />
      <pre>{JSON.stringify(timeRange)}</pre>
      <pre>{JSON.stringify(video, null, 2)}</pre>
    </div >
  );
}
