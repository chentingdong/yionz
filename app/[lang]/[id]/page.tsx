import { Locale } from '@/i18n/i18n-config';
import { redirect } from 'next/navigation';

export type PageProps = {
  params: {
    lang: Locale;
    id: string;
    step: string;
  };
};

export default async function Page({ params }: PageProps) {
  redirect(`/${params.lang}/${params.id}/step1`);
  return (
    <span>Redirecting to step 1</span>
  );
}

