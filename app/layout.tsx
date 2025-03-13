import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/sidebar";
import { GameProvider } from "@/components/gameContext";
import { SnakeProvider } from "@/components/snakeContext";
import { StrawberryProvider } from "@/components/strawberryContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snake",
  description: "simple snake game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased flex flex-row gap-4 bg-[#2B3A67] p-10`}
      >
        <GameProvider>
          <SnakeProvider>
            <StrawberryProvider>
              <Sidebar></Sidebar>
              {children}
            </StrawberryProvider>
          </SnakeProvider>
        </GameProvider> 
      </body>
    </html>
  );
}
