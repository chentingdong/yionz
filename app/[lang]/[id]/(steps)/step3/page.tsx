import React from "react";
import AppSteps from "@/app/[lang]/[id]/appSteps";
import { PageProps } from "@/app/[lang]/[id]/page";
import { getArtifact } from "@/app/[lang]/action";

export default async function MakeMovie({ params }: PageProps) {
  const artifact = await getArtifact(params.id);

  return (
    <div>
      <AppSteps params={params} />
      <div className="container">
        <div className="row g-0">
          {artifact?.clips.map((clip, index) => (
            <div className="col-3">
              {clip.film?.url.includes("http") && (
                <>
                  <video width="100%" height="auto" controls>
                    <source
                      src={clip.film?.url + "?" + Date.now()}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  {clip.order}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
