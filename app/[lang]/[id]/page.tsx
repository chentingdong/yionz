import AppSteps from "./appSteps";
import { Locale } from '@/i18n/i18n-config';
import { getTranslation } from "@/i18n/translations";
import prisma from "@/prisma/prisma";

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

const getArtifact = async (id: string) => {
  const artifact = await prisma.artifact.findUnique({
    where: {
      id: id,
    },
    include: {
      template: true,
      movie: true,
      clips: true
    }
  });
  return artifact;
};

