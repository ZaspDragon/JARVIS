import type { Metadata } from "next";
import "./globals.css";
import "./workspaces.css";
import "./neural-core.css";

export const metadata: Metadata = {
  title: "JARVIS",
  description: "Your personal AI command center",
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
