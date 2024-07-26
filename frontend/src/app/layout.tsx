import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import "./globals.css";
import "@mantine/core/styles.css";
import { theme } from "../theme/theme";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Braille Typing Trainer",
  description: "Practice typing using a Braille Keyboard.",
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
