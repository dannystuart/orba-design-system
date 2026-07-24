import type { Metadata } from "next";
import localFont from "next/font/local";
import { Ambient } from "@/components/site/Ambient";
import { SiteChrome } from "@/components/site/SiteChrome";
import "@/styles/globals.css";

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORBA Design System",
  description: "Mindful by design — the ORBA design system.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body>
        <Ambient />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
