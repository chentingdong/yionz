import Link from "next/link";
import { dateFormat } from "@/app/components/helpers";
import { format } from 'date-fns';
import prisma from "@/prisma/prisma";

export default async function Page() {
  const artifacts = await getData();

  return (
    <div className="container">
      <h2>Video Library</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">Prompt</th>
            <th scope="col">Created At</th>
            <th scope="col">Movie</th>
          </tr>
        </thead>
        <tbody>
          {artifacts.map((artifact, index) => (
            <tr key="index">
              <th scope="row">{artifact.name}</th>
              <td>{artifact.prompt}</td>
              <td>{format(artifact.createdAt.getTime(), dateFormat.display)}</td>
              <td>
                <video className="col" controls width="160" height="auto">
                  <source src={artifact.movie?.url} type="video/mp4" />
                  Your browser does not support video tag.
                </video>
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

