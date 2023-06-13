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
  const fileTypes = ["MP4"];
  const [timeRange, setTimeRange] = React.useState<TimeRange>({
    start: video.startAt,
    end: video.endAt
  });

  const updateVideo = (e) => {
    console.log(e.target.value);
  };

  const timeChangeHandler = (time: TimeRange) => {
    console.log(time);
    setTimeRange(time);
  };

  return (
    <div className="row">
      <div className="col-11">

        <FileUploader
          multiple={true}
          handleChange={updateVideo}
          name="file"
          types={fileTypes}
        />
        <br />
        <video width="100%" height="auto" controls>
          <source src={video.url || " "} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {video.url &&
          <TimeRangeSlider
            name={"timeRange"}
            disabled={false}
            format={24}
            minValue={"00:00"}
            maxValue={video.length}
            step={1}
            onChange={timeChangeHandler}
            value={timeRange} />
        }
      </div>
      <div className="col-1">
        &nbsp;
      </div>
      {/* <pre>{JSON.stringify(timeRange)}</pre> */}
      {/* <pre>{JSON.stringify(video, null, 2)}</pre> */}
    </div >
  );
}
