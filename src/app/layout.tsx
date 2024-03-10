import type { Metadata } from "next";
import { Karla } from "next/font/google";

import "@/ui/styles/tailwind.css";
import Navbar from "@/ui/components/Navbar/Navbar";

const font = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="grid h-full min-h-screen bg-black 4xl:items-start 4xl:justify-center 4xl:py-48">
          <div className="flex w-full max-w-[100vw] flex-col items-start gap-4 2xl:gap-8 md:py-24 md:px-36 2xl:max-w-screen-2xl 3xl:max-w-[1920px] 4xl:py-0">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
