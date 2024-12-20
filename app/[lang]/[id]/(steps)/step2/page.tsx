import AppSteps from "@/app/[lang]/[id]/appSteps";
import EditClip from "./clip";
import { PageProps } from "@/app/[lang]/[id]/page";
import React from "react";
import { getArtifact } from "@/app/[lang]/action";
import { useTranslation } from '@/i18n/i18n.server';

export default async function VideoClips({ params }: PageProps) {
  const artifact = await getArtifact(params.id);
  const { t } = await useTranslation(params.lang);

  params.step = "step2";
  const defaultOpen = 1;
  const patternEnglishChinese = /[\u00ff-\uffff]|\S+/g;
  const defaultShow = (order: number) => order === defaultOpen ? 'show' : '';

  return (
    <div>
      <AppSteps {...params} />
      <div className="container accordion" id="clips">
        {artifact?.clips.map((clip, index) => {
          return (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${clip.id}`}
                  aria-expanded={clip.order === defaultOpen}
                  aria-controls={clip.id}
                >
                  <span className="d-inline-block text-truncate col-7">
                    <b>{t('step2Clip.clip')} {clip.order} : </b>
                    <span>({clip.audio?.text.match(patternEnglishChinese)?.length} words)</span>
                    <span>: {clip.audio?.text}</span>
                  </span>
                </button>
              </h2>
              <div
                id={clip.id}
                className={`accordion-collapse collapse ${defaultShow(clip.order)}`}
              // data-bs-parent="#clips" // comment out will open multiple.
              >
                <div className="accordion-body">
                  <EditClip lang={params.lang} clip={clip} template={artifact.template}  />
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
