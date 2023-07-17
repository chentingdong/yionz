"use client";

import React from "react";
import ActionButton from "@/app/components/buttons.action";
import { generateMovie } from "./movie.action";
import { ClipWithRelationships } from '../step2/clip';
import { useTranslation } from '@/i18n/i18n.client';

type Props = {
  id: string;
  lang: string;
  clips: ClipWithRelationships[];
}
export default async function EditMovie({id, lang, clips}: Props) {
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation(lang);
  const handleGenerateMovie = async () => {
    setLoading(true);
    await generateMovie(id);
    setLoading(false);
  };

  return (
    <div>
      <div className="row g-0">
        {clips?.map((clip, index) => (
          <div className="col-2 text-center" key={index}>
            {clip.film?.url && 
                <video width="100%" height="auto" controls>
                  <source src={clip.film.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
            }
            {!clip.film?.url && <div>{t('step3Movie.noMovie')}</div>}
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
