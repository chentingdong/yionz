import { deleteAnimation, generateAnimation } from "./animation.actions";

import ActionButton from "@/app/components/buttons.action";
import React from "react";
import {ClipProps} from './clip';

export default function CreateAnimation({ clip }: ClipProps) {
  const animation = clip.animation;
  const [loading, setLoading] = React.useState(false);

  const handleGenerateAnimation = async (id?: string) => {
    setLoading(true);
    if (!id) return;
    await generateAnimation({id, clip});
    setLoading(true);
  };

  const handleDeleteAnimation = async (id?: string) => {
    setLoading(true);
    if (!id) return;
    await deleteAnimation(id);
    setLoading(false);
  };

  return (
    <div className="row">
      <div className="col-1">&nbsp;</div>
      <div className="col-10">
        {animation?.url &&
          <video width="100%" height="auto" controls>
            <source src={animation.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        }
        {!animation?.url && <div>No AI animation created</div>}
      </div>
      <div className="col-1">
        {!animation?.url &&
          <ActionButton 
            action="create" onClick={(e) => handleGenerateAnimation(clip.animation?.id)} 
            loading={loading}/>
        }
        {animation?.url &&
          <ActionButton
            action="delete"
            onClick={(e) => handleDeleteAnimation(clip.animation?.id)}
            loading={loading}
          />
        }
      </div>
    </div>
  );
}
