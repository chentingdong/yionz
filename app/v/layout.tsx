import Footer from "@/app/components/footer";
import Header from "@/app/components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="vh-100 d-flex flex-column justify-content-between">
        <Header />
        <main className="flex-grow-1 overflow-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}