import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ศูนย์การแพทย์แผนไทย | Telemedicine",
  description: "ระบบ Telemedicine ศูนย์การแพทย์แผนไทย - นัดหมายแพทย์ออนไลน์ ปรึกษาแพทย์ผ่านวิดีโอ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
