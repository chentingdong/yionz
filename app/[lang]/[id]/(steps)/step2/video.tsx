import { Template, Video } from "@prisma/client";
import { deleteVideo, updateVideo, uploadVideo } from "./video.actions";

import ActionButton from "@/app/components/buttons.action";
import { FileUploader } from "react-drag-drop-files";
import Loading from "@/app/components/loading";
import React from "react";
import TimeRangeSlider from 'react-time-range-slider';

type Props = {
  video: Video | null;
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
    start: video?.startAt || "00:00",
    end: maxTimeString([video?.duration, video?.endAt, "00:00"])
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

  const timeChangeHandler = async (time: TimeRange) => {
    setTimeRange(time);
    if (!video) return;
    // TODO: need debounce here
    await updateVideo({ ...video, startAt: time.start, endAt: time.end });
  };

  const handleDeleteVideo = async (id: string) => {
    await deleteVideo(id);
    if (!video) return;
    video.url = ' ';
  };

  return (
    <div>
      <div className="row">
        <div className="col-1">&nbsp;</div>
        <div className="col-10">
          <FileUploader
            handleChange={handleUploadVideo}
            name="file"
            types={fileTypes}
            label="Drop a video here."
            multiple={false}
          />
        </div>
        <div className="col-1">
          {loading && <Loading size={20} />}
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-1">&nbsp;</div>
        <div className="col-10">
          <video width="100%" height="auto" controls>
            <source src={video?.url || " "} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="col-1">
          {video &&
            <ActionButton
              action="delete"
              onClick={() => handleDeleteVideo(video.id)}
            />
          }
        </div>
      </div>
      {video?.url && (
        <div className="row">
          <div className="col-1">{timeRange.start}</div>
          <div className="col-10 my-2">
            <TimeRangeSlider
              name={"timeRange"}
              disabled={false}
              draggableTrack={false}
              format={24}
              minValue={"00:00"}
              maxValue={video.duration}
              step={1}
              onChange={timeChangeHandler}
              value={timeRange} />

          </div>
          <div className="col-1">{timeRange.end}</div>
        </div>
      )}
    </div>
  );
}

function maxTimeString(strs) {
  strs.sort(function (a, b) {
    a = a.split(':');
    b = b.split(':');
    for (var i = 0; i < a.length && i < b.length && a[i] === b[i]; i++);
    return ((i === a.length) || (+a[i] < +b[i])) ? 1 : -1;
  });
  console.log(strs);
  return strs[0];
}