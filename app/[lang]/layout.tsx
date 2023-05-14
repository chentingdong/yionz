import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { Locale } from "@/i18n/i18n-config";
import { getTranslation } from "@/i18n/translations";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; };
}) {
  const translation = await getTranslation(params.lang);

  return (
    <html lang={params.lang}>
      <body className="vh-100 d-flex flex-column justify-content-between">
        <Header lang={params.lang} translation={translation} />
        <main className="flex-grow-1 overflow-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}