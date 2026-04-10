import type { Metadata } from "next";
import "./globals.css";
import { SmoothCursor } from "./components/SmoothCursor";

export const metadata: Metadata = {
  title: "Vaibhav Social — Video Editor & Content Strategist",
  description:
    "I help Instagram & YouTube creators grow faster with scroll-stopping video edits and smart content strategy. 45K+ followers, 2M+ views generated.",
  keywords: ["video editor", "content strategist", "Instagram growth", "YouTube growth", "reels editor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
