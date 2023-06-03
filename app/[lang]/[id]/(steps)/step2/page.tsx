import AppSteps, { PageParams } from "@/app/[lang]/[id]/appSteps";

import React from "react";
import { getTranslation } from "@/i18n/translations";

export default async function VideoClips({ params }: PageParams) {
  const translation = await getTranslation(params.lang);

  return (
    <div>
      <AppSteps params={{ params }} translation={translation} />
      <div>Video clips</div>
    </div>
  );
}
