import prisma from "@/prisma/prisma";

export default function Page() {
  const appState = getData()
  console.log('appState', appState)

  return <h1>Hello, Next.js!</h1>;
}

const getData = async () => {
  const appState = await prisma.appState.findMany();
  return {
    props: appState,
  };
};

