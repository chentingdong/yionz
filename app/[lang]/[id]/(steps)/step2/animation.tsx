import { deleteAnimation, generateAnimation } from "./animation.actions";

import ActionButton from "@/app/components/buttons.action";
import { ClipWithRelationships } from "./clip";
import React from "react";

type Props = {
  clip: ClipWithRelationships;
  translation: any;
};
export default function CreateAnimation({ clip, translation }: Props) {
  const handleGenerateAnimation = async (id?: string) => {
    if (!id) return;
    await generateAnimation({id: id, artifactId: clip.artifactId});
  };

  const handleDeleteAnimation = async (id?: string) => {
    if (!id) return;
    await deleteAnimation(id);
  };

  return (

    <div className="row">
      <div className="col-1">&nbsp;</div>
      <div className="col-10">
        {clip.animation?.url &&
          <video width="100%" height="auto" controls>
            <source src={clip.animation.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        }
        {!clip.animation?.url && <div>No AI animation created</div>}
      </div>
      <div className="col-1">
        {!clip.animation?.url &&
          <ActionButton action="create" onClick={(e) => handleGenerateAnimation(clip.animation?.id)} />
        }
        {clip.animation?.url &&
          <ActionButton
            action="delete"
            onClick={(e) => handleDeleteAnimation(clip.animation?.id)}
          />
        }
      </div>
    </div>
  );
}
