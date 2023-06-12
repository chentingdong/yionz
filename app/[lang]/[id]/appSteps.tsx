import Link from "next/link";
import { PageProps } from "./page";
import React from "react";
import { getTranslation } from "@/i18n/translations";

type AppStepsProps = {
  params: {
    lang: Locale;
    id: string;
    step: string;
  };
  translation: any;
};

export default async function AppSteps({ params }: PageProps) {
  const translation = await getTranslation(params.lang);
  const className = (step: string) => params.step === step ? 'btn btn-secondary' : 'btn btn-primary';

  return (
    <div className="container d-flex w-100 justify-content-between my-2" id="steps">
      <Link className={className('step1')} href={`/${params.lang}/${params.id}/step1`}>
        {translation.appSteps.makeStory}
      </Link>
      <Link className={className('step2')} href={`/${params.lang}/${params.id}/step2`}>
        {translation.appSteps.videoClips}
      </Link>
      <Link className={className('step3')} href={`/${params.lang}/${params.id}/step3`}>
        {translation.appSteps.makeMovie}
      </Link>
      <Link className={className('step4')} href={`/${params.lang}/${params.id}/step4`}>
        {translation.appSteps.bso}
      </Link>
    </div >
  );
}
