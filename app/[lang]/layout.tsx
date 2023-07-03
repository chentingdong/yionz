import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { Locale } from "@/i18n/i18n-config";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingPage } from "@/app/components/loading";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <html lang={params.lang}>
      <body className="vh-100 d-flex flex-column justify-content-between">
        <Header params={params} session={session} />
        <Suspense fallback={<LoadingPage />}>
          <main className="flex-grow-1 overflow-auto">
            {children}
          </main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}