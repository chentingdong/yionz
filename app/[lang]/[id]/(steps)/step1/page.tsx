import AppSteps from "@/app/[lang]/[id]/appSteps";
import Headline from "./headline";
import Prompt from "./prompt";
import React from "react";
import Story from "./story";
import { getArtifact } from "../../../action";
import { getTemplates } from "../../../templates/actions";
import { getTranslation } from "@/i18n/translations";

export default async function MakeStory({ params }: PageParams) {
  const artifact = await getArtifact(params.id);
  const templates = await getTemplates();
  const translation = await getTranslation(params.lang);

  if (!artifact || !templates || !translation) return <>Loading...</>;

  return (
    <div className="container h-100 d-flex flex-column">
      <AppSteps params={params} translation={translation} />
      <Headline artifact={artifact} translation={translation} templates={templates} />
      <Prompt artifact={artifact} translation={translation} />
      <Story artifact={artifact} translation={translation} />
    </div>
  );
}
