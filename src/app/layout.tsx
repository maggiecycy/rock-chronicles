import type { Metadata } from "next";
import { MagazineNav } from "@/components/MagazineNav";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rock Chronicles",
    template: "%s · Rock Chronicles",
  },
  description:
    "An interactive rock chronicle: long-scroll narratives, timeline, genre map, and node-triggered soundscapes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-paper text-ink antialiased"
        suppressHydrationWarning
      >
        <Providers>
          <MagazineNav />
          <div className="flex-1">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
