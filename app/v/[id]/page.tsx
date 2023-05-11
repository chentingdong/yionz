import AppSteps from "./appSteps";
import prisma from "@/prisma/prisma";

export default async function Page({ params }) {
  const artifact = await getData(params.id);
  console.log(artifact);
  return (
    <div className="container">
      <label className="text-capitalize"><b>Video Story</b>: {artifact?.name}</label>
      <AppSteps />
    </div >
  );
}

const getData = async (id: string) => {
  const artifact = await prisma.artifact.findUnique({
    where: {
      id: id,
    },
    include: {
      template: true,
      movie: true,
      clips: true
    }
  });
  return artifact;
};

