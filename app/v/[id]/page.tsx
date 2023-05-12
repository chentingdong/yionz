import AppSteps from "./appSteps";
import prisma from "@/prisma/prisma";

export default async function Page({ params }) {
  const artifact = await getData(params.id);
  return (
    <div className="container d-flex flex-column h-100">
      <label className="text-capitalize"><b>Video Story:</b> {artifact?.name}</label>
      <div id="step-tabs" className="flex-grow-1 d-flex flex-column">
        <AppSteps />
      </div>
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

