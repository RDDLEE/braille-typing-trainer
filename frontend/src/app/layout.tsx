import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import { theme } from "../theme/theme";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Braille Typing Trainer",
  description: "Practice typing using a Braille Keyboard.",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/icons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/icons/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/icons/apple-touch-icon.png",
    },
  ],
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="light" theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
