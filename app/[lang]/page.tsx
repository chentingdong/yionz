import Link from "next/link";
import { Locale } from '@/i18n/i18n-config';
import { dateFormat } from "@/app/components/helpers";
import { format } from 'date-fns';
import { getTranslation } from "@/i18n/translations";
import prisma from "@/prisma/prisma";

type PageProps = {
  params: {
    lang: Locale,
  };
};

export default async function Page({ params }: PageProps) {
  const artifacts = await getData();
  const translation = await getTranslation(params.lang);

  return (
    <div className="container">
      <h2>{translation.landingPage.videoLibrary}</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{translation.landingPage.name}</th>
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
              <td>{artifact.prompt}</td>
              <td>{format(artifact.createdAt.getTime(), dateFormat.display)}</td>
              <td>
                {artifact.movie.url &&
                  <video className="col" controls height="100" width="auto">
                    <source src={artifact.movie.url} type="video/mp4" />
                    Your browser does not support video tag.
                  </video>
                }
                {!artifact.movie.url && <span>No video</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const getData = async () => {
  const artifacts = await prisma.artifact.findMany({
    include: {
      template: true,
      movie: true,
      clips: true,
      _count: true
    }
  });
  return artifacts;
};

