"use client";

import React from "react";
import ActionButton from "@/app/components/buttons.action";
import { generateMovie } from "./movie.action";
import { ArtifactWithRelations } from "../step1/page";

export default async function EditMovie(artifact: ArtifactWithRelations) {
  const [loading, setLoading] = React.useState(false);

  const handleGenerateMovie = async () => {
    setLoading(true);
    await generateMovie(artifact.id);
    setLoading(false);
  };

  return (
    <div>
      <div className="row g-0">
        {artifact.clips?.map((clip, index) => (
          <div className="col-2" key={index}>
            {clip.film?.url.includes("http") && (
              <>
                <video width="100%" height="auto" controls>
                  <source
                    src={clip.film.url + "?" + Date.now()}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </>
            )}
          </div>
        ))}
      </div>
      <ActionButton
        action="create"
        onClick={handleGenerateMovie}
        loading={loading}
      />
    </div>
  );
}
