"use server";

import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingPage } from "@/app/components/loading";
import { dir } from "i18next";
import { ErrorBoundary } from "react-error-boundary";

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
      <body className="vh-100 d-flex flex-column justify-content-between">
        <Header lang={lang} session={session} />
        <Suspense fallback={<LoadingPage />}>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <main className="flex-grow-1 overflow-auto">{children}</main>
          </ErrorBoundary>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}

