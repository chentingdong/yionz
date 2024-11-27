import React from "react";
import AppSteps from "@/app/[lang]/[id]/appSteps";
import { PageProps } from "@/app/[lang]/[id]/page";
import EditMovie from "./movie";
import { getArtifact } from "@/app/[lang]/action";

export default async function MakeMovie({ params }: PageProps) {
  const artifact = await getArtifact(params.id);
  params.step = 'step3'
  if (!artifact) return <></>;
  const { width, height } = artifact?.template;

  return (
    <div className="container">
      <AppSteps {...params} />
      <EditMovie id={params.id} lang={params.lang} clips={artifact.clips} />
      {artifact.movie && (
        <div className="d-flex justify-content-center">
          {artifact.movie?.url &&
            <video width={width} height={height} controls>
              <source src={artifact.movie.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          }
          {!artifact.movie?.url && <div>N/A</div>}
        </div>
      )}
    </div>
  );
}
