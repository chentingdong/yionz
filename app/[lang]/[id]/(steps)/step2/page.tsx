import AppSteps from "@/app/[lang]/[id]/appSteps";
import Clip from "./clip";
import { PageProps } from "@/app/[lang]/[id]/page";
import React from "react";
import { getArtifact } from "@/app/[lang]/action";

export default async function VideoClips({ params }: PageProps) {
  const artifact = await getArtifact(params.id);
  params.step = "step2";
  const defaultShow = (order: number) => order === 0 ? 'show' : '';
  return (
    <div>
      <AppSteps params={params} />
      <div className="container accordion accordion-flush" id="clips">
        {artifact?.clips.map((clip, index) => {
          return (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header text-truncate">
                <button
                  className="accordion-button collapsed "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${clip.id}`}
                  aria-expanded={clip.order === 0}
                  aria-controls={clip.id}
                >
                  {clip.order}: {clip.audio.text}
                </button>
              </h2>
              <div
                id={clip.id}
                className={`accordion-collapse collapse ${defaultShow(clip.order)}`}
                data-bs-parent="#clips" // comment out will open multiple.
              >
                <div className="accordion-body">
                  <Clip clip={clip} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
1;
