import AppSteps from "./appSteps";
import { Locale } from '@/i18n/i18n-config';
import { getArtifact } from "../action";
import { getTranslation } from "@/i18n/translations";

export type PageProps = {
  params: {
    lang: Locale,
    id: string,
  };
};

export default async function Page({ params }: PageProps) {
  const artifact = await getArtifact(params.id);
  const translation = await getTranslation(params.lang);

  return (
    <AppSteps artifact={artifact} translation={translation} />
  );
}

