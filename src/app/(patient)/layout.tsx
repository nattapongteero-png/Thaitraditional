"use client";
import { PatientLayout } from "@/app/components/PatientLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <PatientLayout>{children}</PatientLayout>;
}
