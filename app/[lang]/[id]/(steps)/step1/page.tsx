import Headline from "./headline";
import { PageProps } from "../../page";
import Prompt from "./prompt";
import React from "react";
import Story from "./story";
import { getArtifact } from "../../../action";
import { getTemplates } from "../../../templates/actions";
import { getTranslation } from "@/i18n/translations";

export default async function MakeStory({ params }: PageProps) {
  const artifact = await getArtifact(params.id);
  const templates = await getTemplates();
  const translation = await getTranslation(params.lang);

  if (!artifact || !templates || !translation) return <>error</>;


  return (
    <div className="container h-100 d-flex flex-column">
      <Headline artifact={artifact} translation={translation} templates={templates} />
      <Prompt artifact={artifact} translation={translation} />
      <Story artifact={artifact} translation={translation} />
    </div>
  );
}
