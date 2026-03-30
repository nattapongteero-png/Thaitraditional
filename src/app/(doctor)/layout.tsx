"use client";
import { DoctorLayout } from "@/app/components/DoctorLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DoctorLayout>{children}</DoctorLayout>;
}
