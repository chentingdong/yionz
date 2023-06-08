import AppSteps from "@/app/[lang]/[id]/appSteps";
import React from "react";
import { getArtifact } from "@/app/[lang]/action";
import { getTemplates } from "@/app/[lang]/templates/actions";
import { getTranslation } from "@/i18n/translations";

export default async function VideoClips({ params }: PageParams) {
  const artifact = await getArtifact(params.id);
  const templates = await getTemplates();
  const translation = await getTranslation(params.lang);

  return (
    <div>
      <AppSteps params={params} translation={translation} />
      <div className="container">
        <pre>{JSON.stringify(artifact?.clips, null, 2)}</pre>
      </div>
    </div>
  );
}
