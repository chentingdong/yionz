import { Template, Video } from "@prisma/client";
import { deleteVideo, updateVideo, uploadVideo } from "./video.actions";

import ActionButton from "@/app/components/buttons.action";
import { FileUploader } from "react-drag-drop-files";
import Loading from "@/app/components/loading";
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

  const timeChangeHandler = async (time: TimeRange) => {
    setTimeRange(time);
    // TODO: need debounce here
    await updateVideo({ ...video, startAt: time.start, endAt: time.end });
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
        <div className="col-1">
          {loading && <Loading size={20} />}
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-11">
          <div className="row">
            <video width="100%" height="auto" controls>
              <source src={video.url || " "} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {video.url && (
            <div className="row">
              <div className="col-1">{video.startAt}</div>
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
              <div className="col-1">{video.endAt}</div>
            </div>
          )}
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
