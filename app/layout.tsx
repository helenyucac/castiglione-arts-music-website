import type { Metadata } from "next";
import "./globals.css";
import "./site.css";

export const metadata: Metadata = {
  title: "Castiglione",
  description:
    "Castiglione is an Australia-based touring production company for anime concerts, gaming concerts, classical concerts, exhibitions, Lucid Live projects, and cultural live experiences.",
  openGraph: {
    title: "Castiglione",
    description:
      "Castiglione is an Australia-based touring production company for anime concerts, gaming concerts, classical concerts, exhibitions, Lucid Live projects, and cultural live experiences.",
    siteName: "Castiglione",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Castiglione",
    description:
      "Castiglione is an Australia-based touring production company for anime concerts, gaming concerts, classical concerts, exhibitions, Lucid Live projects, and cultural live experiences.",
  },
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
