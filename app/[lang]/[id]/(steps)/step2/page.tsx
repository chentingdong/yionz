import AppSteps from "@/app/[lang]/[id]/appSteps";
import EditClip from "./clip";
import { PageProps } from "@/app/[lang]/[id]/page";
import React from "react";
import { getArtifact } from "@/app/[lang]/action";
import { getTranslation } from "@/i18n/translations";

export default async function VideoClips({ params }: PageProps) {
  const artifact = await getArtifact(params.id);
  params.step = "step2";
  const defaultShow = (order: number) => order === 0 ? 'show' : '';
  const translation = await getTranslation(params.lang);

  return (
    <div>
      <AppSteps params={params} />
      <div className="container accordion" id="clips">
        {artifact?.clips.map((clip, index) => {
          return (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header text-truncate">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${clip.id}`}
                  aria-expanded={clip.order === 0}
                  aria-controls={clip.id}
                >
                  Clip {clip.order} : {clip.audio.text}
                </button>
              </h2>
              <div
                id={clip.id}
                className={`accordion-collapse collapse ${defaultShow(clip.order)}`}
              // data-bs-parent="#clips" // comment out will open multiple.
              >
                <div className="accordion-body">
                  <EditClip clip={clip} template={artifact.template} translation={translation} />
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
