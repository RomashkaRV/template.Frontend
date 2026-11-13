import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import "style/index.scss";

import { Notifications, SwitchThemeButton } from "../widgets";
import { themeScript } from "./_components";

export const metadata: Metadata = {
  title: "Next App",
  description: "Description of Next App",
  icons: {
    icon: "/next.svg"
  }
};

const GoogleSans = localFont({
  src: [
    {
      path: "../../public/fonts/GoogleSans.woff2",
      weight: "400 700",
      style: "normal"
    }
  ],
  display: "swap"
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml -- статичная строка, нужна до первой отрисовки */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className={GoogleSans.className}>
        <main>{children}</main>

        <Notifications />

        <SwitchThemeButton />
      </body>
    </html>
  );
}
