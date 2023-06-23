import AppSteps from "@/app/[lang]/[id]/appSteps";
import Headline from "./headline";
import { PageProps } from "@/app/[lang]/[id]/page";
import { Prisma } from "@prisma/client";
import Prompt from "./prompt";
import React from "react";
import Story from "./story";
import { getArtifact } from "../../../action";
import { getTemplates } from "../../../templates/actions";
import { getTranslation } from "@/i18n/translations";
import { randomUUID } from "crypto";

export type ArtifactWithRelations = Prisma.ArtifactGetPayload<{
  include: {
    template: true;
    clips: {
      include: {
        audio: true,
        video: true,
        animation: true,
        images: true,
        film: true,
        videoSource: true,
      };
    };
  };
}>;

export default async function MakeStory({ params }: PageProps) {
  if (!params.id) params.id = randomUUID();
  const artifact = await getArtifact(params.id);
  const templates = await getTemplates();
  const translation = await getTranslation(params.lang);
  params.step = "step1";

  if (!artifact || !templates || !translation) return <>Loading...</>;

  return (
    <div className="container h-100 d-flex flex-column">
      <AppSteps params={params} />
      <Headline
        artifact={artifact}
        translation={translation}
        templates={templates}
      />
      <Prompt artifact={artifact} translation={translation} />
      <Story lang={params.lang} artifact={artifact} translation={translation} />
    </div>
  );
}
