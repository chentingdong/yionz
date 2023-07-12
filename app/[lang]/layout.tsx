"use server";

import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingPage } from "@/app/components/loading";
import { dir } from 'i18next'
import { languages } from '@/i18n/settings';

export default async function RootLayout({
  children,
  params: {lang},
}: {
  children: React.ReactNode;
  params: { lang: string; };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <html lang={lang} dir={dir(lang)}>
      <body className="vh-100 d-flex flex-column justify-content-between">
        <Header lang={lang} session={session} />
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

