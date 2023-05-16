import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="container my-2">
      {session.user.image && <Image src={session.user.image} alt="" width={100} height={100} />}
      <div>Name: {session.user.name}</div>
      <div>Email: {session.user.email}</div>
    </main>
  );
}
