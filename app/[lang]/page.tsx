import { createArtifact, getArtifacts } from "./action";

import Link from "next/link";
import { Locale } from '@/i18n/i18n-config';
import { dateFormat } from "@/app/components/helpers";
import { format } from 'date-fns';
import { getTranslation } from "@/i18n/translations";

type PageProps = {
  params: {
    lang: Locale,
  };
};

export default async function Page({ params }: PageProps) {
  const artifacts = await getArtifacts();
  const translation = await getTranslation(params.lang);

  return (
    <div className="container">
      <h3>{translation.landingPage.videoLibrary}</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{translation.landingPage.name}</th>
            <th scope="col">{translation.landingPage.template}</th>
            <th scope="col">{translation.landingPage.prompt}</th>
            <th scope="col">{translation.landingPage.createdAt}</th>
            <th scope="col">{translation.landingPage.video}</th>
          </tr>
        </thead>
        <tbody>
          {artifacts.map((artifact, index) => (
            <tr key={index}>
              <th scope="row">
                <Link href={`${params.lang}/${artifact.id}`}>
                  {artifact.name}
                </Link>
              </th>
              <td>{artifact.template?.name}</td>
              <td>{artifact.prompt}</td>
              <td>{format(artifact.createdAt.getTime(), dateFormat.display)}</td>
              <td>
                {artifact.movie?.url &&
                  <video className="col" controls height="100" width="auto">
                    <source src={artifact.movie.url} type="video/mp4" />
                    Your browser does not support video tag.
                  </video>
                }
                {!artifact.movie?.url && <span>No video</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form action={createArtifact}>
        <button className="btn btn-primary">+</button>
      </form>
    </div>
  );
}

