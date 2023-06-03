"use client";

import Link from "next/link";
import { Locale } from "@/i18n/i18n-config";
import React from "react";

export type AppStepsProps = {
  params: {
    lang: Locale,
    id: string,
    step: string,
  },
  translation: any;
};

export default function AppSteps({ params, translation }: AppStepsProps) {
  return (
    <div className="container d-flex w-100 justify-content-between my-2" id="steps">
      <Link className="btn btn-primary" href={`/${params.lang}/${params.id}/step1`}>
        {translation.appSteps.makeStory}
      </Link>
      <Link className="btn btn-primary" href={`/${params.lang}/${params.id}/step2`}>
        {translation.appSteps.videoClips}
      </Link>
      <Link className="btn btn-primary" href={`/${params.lang}/${params.id}/step3`}>
        {translation.appSteps.makeMovie}
      </Link>
      <Link className="btn btn-primary" href={`/${params.lang}/${params.id}/step4`}>
        {translation.appSteps.bso}
      </Link>
    </div >
  );
}
