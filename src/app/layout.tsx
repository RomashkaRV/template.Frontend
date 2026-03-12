import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import "style/index.scss";

import { Notifications, SwitchThemeButton } from "../widgets";

import { SetTheme } from "./_components";

export const metadata: Metadata = {
  title: "Next App",
  description: "Description of Next App",
  icons: {
    icon: "/next.svg"
  }
};

const GoogleSans = localFont({
  src: [{ path: "../../public/fonts/GoogleSans.ttf", style: "normal" }]
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={GoogleSans.className}>
        <div>{children}</div>

        <Notifications />

        <SetTheme />

        <SwitchThemeButton />
      </body>
    </html>
  );
}
