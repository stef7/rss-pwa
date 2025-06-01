import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const sans = Lexend({
  variable: "--font-lexend",
  adjustFontFallback: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RSS PWA",
  icons: {
    icon: { rel: "icon", url: "/rss.svg", type: "image/svg+xml", sizes: "any" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased`}>{children}</body>
    </html>
  );
}
