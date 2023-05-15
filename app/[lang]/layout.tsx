import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { Locale } from "@/i18n/i18n-config";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { getTranslation } from "@/i18n/translations";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; };
}) {
  const translation = await getTranslation(params.lang);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <html lang={params.lang}>
      <body className="vh-100 d-flex flex-column justify-content-between">
        {/* @ts-expect-error Server Component */}
        <Header lang={params.lang} translation={translation} />
        <main className="flex-grow-1 overflow-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}