import { Prisma } from "@prisma/client";

import AppSteps from "@/app/[lang]/[id]/appSteps";
import Headline from "./headline";
import { PageProps } from "@/app/[lang]/[id]/page";
import Prompt from "./prompt";
import React from "react";
import Story from "./story";
import { getArtifact } from "../../../action";
import { getTemplates } from "../../../templates/actions";
import { randomUUID } from "crypto";

export type ArtifactWithRelations = Prisma.ArtifactGetPayload<{
  include: {
    template: true;
    movie: true;
    clips: {
      include: {
        audio: true,
        video: true,
        animation: true,
        images: true,
        film: true,
      };
    };
  };
}>;

export default async function MakeStory({params}: PageProps) {
  if (!params.id) params.id = randomUUID();
  const artifact = await getArtifact(params.id);
  const templates = await getTemplates();
  params.step = "step1";

  if (!artifact || !templates) return <>Loading...</>;

  return (
    <div className="container h-100 d-flex flex-column">
      <AppSteps {...params} />
      <Headline
        lang={params.lang}
        artifact={artifact}
        templates={templates}
      />
      <Prompt artifact={artifact} lang={params.lang} />
      <Story lang={params.lang} artifact={artifact} />
    </div>
  );
}
