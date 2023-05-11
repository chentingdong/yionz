import Link from "next/link";
import prisma from "@/prisma/prisma";

export default async function Page({ params }) {
  const artifacts = await getData(params.id);
  console.log(artifacts);

  return (
    <div className="container">
      {params.id}
    </div>
  );
}

const getData = async (id: string) => {
  const artifacts = await prisma.artifact.findUnique({
    where: {
      id: id,
    },
    include: {
      template: true,
      movie: true,
      clips: true
    }
  });
  return artifacts;
};

