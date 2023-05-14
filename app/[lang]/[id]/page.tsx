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
  const artifact = await getData(params.id);
  const translation = await getTranslation(params.lang);

  return (
    <div className="container h-100">
      <AppSteps artifact={artifact} translation={translation} />
    </div>
  );
}

const getData = async (id: string) => {
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

