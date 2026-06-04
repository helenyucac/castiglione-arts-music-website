import type { Metadata } from "next";
import "./globals.css";
import "./site.css";

export const metadata: Metadata = {
  title: "Castiglione Arts & Music | Touring Production Australia",
  description:
    "Australia-based touring production company for live orchestral anime and gaming concerts, classical recitals, and chamber music tours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
