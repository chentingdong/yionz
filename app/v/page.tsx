import prisma from "@/prisma/prisma";

export default async function Page() {
  const appState = await getData();
  console.log('appState', appState);

  return <h1>Hello, Next.js!!</h1>;
}

const getData = async () => {
  const appState = await prisma.appState.findMany({
    include: {
      template: true,
      movie: true,
      clips: true
    }
  });
  return appState;
};

