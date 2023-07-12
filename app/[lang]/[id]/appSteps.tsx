import Link from "next/link";
import { PageProps } from "./page";
import React from "react";
import { useTranslation } from '@/i18n/i18n.server';

type AppStepsProps = {
  lang: string;
  id: string;
  step: string;
};

export default async function AppSteps({ lang, id, step }: PageProps) {
  const className = (st: string) => st === step ? 'btn btn-secondary' : 'btn btn-primary';
  const { t } = await useTranslation(lang)

  return (
    <div className="container d-flex w-100 justify-content-between my-2" id="steps">
      <Link className={className('step1')} href={`/${lang}/${id}/step1`}>
        {t('appSteps.makeStory')}
      </Link>
      <Link className={className('step2')} href={`/${lang}/${id}/step2`}>
        {t('appSteps.videoClips')}
      </Link>
      <Link className={className('step3')} href={`/${lang}/${id}/step3`}>
        {t('appSteps.makeMovie')}
      </Link>
      <Link className={className('step4')} href={`/${lang}/${id}/step4`}>
        {t('appSteps.bso')}
      </Link>
    </div >
  );
}
