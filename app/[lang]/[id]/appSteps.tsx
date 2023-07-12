import Link from "next/link";
import { PageProps } from "./page";
import React from "react";
import { useTranslation } from '@/i18n/i18n.server';

type AppStepsProps = {
  params: {
    lang: string;
    id: string;
    step: string;
  };
  translation: any;
};

export default async function AppSteps({ params }: PageProps) {
  const className = (step: string) => params.step === step ? 'btn btn-secondary' : 'btn btn-primary';
  const { t } = await useTranslation(params.lang)

  return (
    <div className="container d-flex w-100 justify-content-between my-2" id="steps">
      <Link className={className('step1')} href={`/${params.lang}/${params.id}/step1`}>
        {t('appSteps.makeStory')}
      </Link>
      <Link className={className('step2')} href={`/${params.lang}/${params.id}/step2`}>
        {t('appSteps.videoClips')}
      </Link>
      <Link className={className('step3')} href={`/${params.lang}/${params.id}/step3`}>
        {t('appSteps.makeMovie')}
      </Link>
      <Link className={className('step4')} href={`/${params.lang}/${params.id}/step4`}>
        {t('appSteps.bso')}
      </Link>
    </div >
  );
}
