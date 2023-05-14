import AppSteps from "./appSteps";
import { Locale } from '@/i18n/i18n-config';
import { SessionProvider } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { getTranslation } from "@/i18n/translations";
import prisma from "@/prisma/prisma";

export type PageProps = {
  params: {
    lang: Locale,
    id: string,
  };
};

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const artifact = await getData(params.id);
  const translation = await getTranslation(params.lang);

  return (
    <SessionProvider session={session}>
      <AppSteps artifact={artifact} translation={translation} />
    </SessionProvider>
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

