import AppSteps from "@/app/[lang]/[id]/appSteps";
import { PageProps } from "@/app/[lang]/[id]/page";
import React from "react";
import { getArtifact } from "@/app/[lang]/action";

export default async function VideoClips({ params }: PageProps) {
  const artifact = await getArtifact(params.id);

  return (
    <div>
      <AppSteps params={params} />
      <div className="container">
        <pre>{JSON.stringify(artifact?.clips, null, 2)}</pre>
      </div>
    </div>
  );
}
1;