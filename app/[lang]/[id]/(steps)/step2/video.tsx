import { deleteVideo, updateVideo, uploadVideo } from "./video.actions";

import ActionButton from "@/app/components/buttons.action";
import { FileUploader } from "react-drag-drop-files";
import { Loading } from "@/app/components/loading";
import React from "react";
import TimeRangeSlider from 'react-time-range-slider';
import debounce from 'underscore';

type Props = {
  clip: Clip;
  translation: any;
};

type TimeRange = {
  start: string,
  end: string;
};

export default function CreateVideo({ clip, translation }: Props) {
  const video = clip.video;
  const fileTypes = ["mp4"];
  const [loading, setLoading] = React.useState(false);
  const [timeRange, setTimeRange] = React.useState<TimeRange>({
    start: video?.startAt || "00:00",
    end: convertSecondsToTime(video?.duration) || video?.endAt || '00:00'
  });

  const handleUploadVideo = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("artifactId", clip.artifactId);
    formData.append("clipId", clip.id);
    await uploadVideo(formData);

    setLoading(false);
  };

  const timeChangeHandler = async (time: TimeRange) => {
    if (!time) return;
    const newTime = calculateTimeRange(time, timeRange, clip.audio.duration, clip.video.duration);
    setTimeRange(newTime);
    // TODO: need debounce here
    // await updateVideo({ ...video, startAt: time.start, endAt: time.end });
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
              maxValue={convertSecondsToTime(video.duration)}
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

// function maxTimeString(strs) {
//   strs.sort(function (a, b) {
//     a = a.split(':');
//     b = b.split(':');
//     for (var i = 0; i < a.length && i < b.length && a[i] === b[i]; i++);
//     return ((i === a.length) || (+a[i] < +b[i])) ? 1 : -1;
//   });
//   return strs[0];
// }

const convertSecondsToTime = (seconds: number): string => {
  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;

  // Add leading zeros to minutes and seconds
  const minuteStr = ('0' + minutes).slice(-2);
  const secondStr = ('0' + sec).slice(-2);

  // Return time in minutes:seconds
  const timestr = `${minuteStr}:${secondStr}`;
  return timestr
};

const convertTimeToSeconds = (time: string): number => {
  // Split minute and second
  const timeParts = time.split(':');
  const minutes = parseInt(timeParts[0]);
  const seconds = parseInt(timeParts[1]);

  // Return total seconds
  return minutes * 60 + seconds;
};

/**
 * Given an existing time range A = [startA, endA], and an incoming 
 * time range B = [startB, endB], with a fixed duration. 
 * Keep the duration fixed, find the best fit for range B to be 
 * a sub range of A, so that startA <= startB, endA >= endB.
 */
const calculateTimeRange = (time: TimeRange, timeRange: Timerange, duration: number, durationVideo:number): TimeRange => {
  const changed = (time.start === timeRange.start) ? 'end' : 'start';

  const start0 = convertTimeToSeconds(time.start);
  const end0 = convertTimeToSeconds(time.end);
  if (durationVideo <= duration) return time;

  let [start, end] = [0, duration]
  if (end0 - duration < 0) [start, end] = [start0,  start0 + duration];
  else if (end0 > start0 + duration) [start, end] = [end0 - duration, duration];
  else if (changed === 'start') [start, end] = [start0, start0 + duration]
  else [start, end] = [end0 - duration, end0];

  const [startStr, endStr] = [convertSecondsToTime(start), convertSecondsToTime(end)]
  return {start: startStr, end: endStr}
}