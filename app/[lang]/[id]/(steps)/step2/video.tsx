import { Template, Video } from "@prisma/client";
import { deleteVideo, uploadVideo } from "./actions";

import ActionButton from "@/app/components/buttons.action";
import { FileUploader } from "react-drag-drop-files";
import React from "react";
import TimeRangeSlider from 'react-time-range-slider';

type Props = {
  video: Video;
  artifactId: string;
  clipId: string;
  translation: any;
};

type TimeRange = {
  start: string,
  end: string;
};

export default function CreateVideo({ video, artifactId, clipId }: Props) {
  const fileTypes = ["mp4"];
  const [loading, setLoading] = React.useState(false);
  const [timeRange, setTimeRange] = React.useState<TimeRange>({
    start: video.startAt,
    end: video.endAt
  });

  const handleUploadVideo = async (file: File) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("artifactId", artifactId);
    formData.append("clipId", clipId);
    await uploadVideo(formData);

    setLoading(false);
  };

  const timeChangeHandler = (time: TimeRange) => {
    console.log(time);
    setTimeRange(time);
  };

  const handleDeleteVideo = async (id: string) => {
    await deleteVideo(id);
    video.url = ' ';
  };

  return (
    <div>
      <div className="row">
        <div className="col-11">
          <FileUploader
            handleChange={handleUploadVideo}
            name="file"
            types={fileTypes}
            label="Drop a video here."
            multiple={false}
          />
        </div>
        <div className="col-1">&nbsp;</div>
      </div>
      <br />
      <div className="row">
        <div className="col-11">
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
          <ActionButton
            action="delete"
            onClick={() => handleDeleteVideo(video.id)}
          />
        </div>
      </div>
    </div>
  );
}
