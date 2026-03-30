import { RouterProvider, createBrowserRouter, redirect } from "react-router";
import { Root, RootErrorBoundary } from "./Root";
import { LoginPage } from "./pages/LoginPage";
import { PatientLayout } from "./components/PatientLayout";
import { DoctorLayout } from "./components/DoctorLayout";
import { AdminLayout } from "./components/AdminLayout";
import { PatientDashboard } from "./pages/patient/PatientDashboard";
import { AppointmentPage } from "./pages/patient/AppointmentPage";
import { ReschedulePage } from "./pages/patient/ReschedulePage";
import { WaitingRoomPage } from "./pages/patient/WaitingRoomPage";
import { HistoryPage } from "./pages/patient/HistoryPage";
import { ConsentPage } from "./pages/patient/ConsentPage";
import { DoctorQueue } from "./pages/doctor/DoctorQueue";
import { VisitWizard } from "./pages/doctor/VisitWizard";
import { DoctorReports } from "./pages/doctor/DoctorReports";
import { DoctorTemplates } from "./pages/doctor/DoctorTemplates";
import { DoctorSettings } from "./pages/doctor/DoctorSettings";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserManagement } from "./pages/admin/UserManagement";
import { AuditLog } from "./pages/admin/AuditLog";
import { ClinicSettings } from "./pages/admin/ClinicSettings";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    ErrorBoundary: RootErrorBoundary,
    children: [
      // ── Login ────────────────────────────────────────────────────────
      { index: true, Component: LoginPage },

      // ── Patient portal ───────────────────────────────────────────────
      {
        path: "patient",
        Component: PatientLayout,
        children: [
          { index: true, Component: PatientDashboard },
          { path: "appointment",  Component: AppointmentPage  },
          { path: "reschedule",   Component: ReschedulePage   },
          { path: "waiting-room", Component: WaitingRoomPage  },
          { path: "history",      Component: HistoryPage      },
          { path: "consent",      Component: ConsentPage      },
          { path: "*", loader: () => redirect("/patient") },
        ],
      },

      // ── Doctor portal ────────────────────────────────────────────────
      {
        path: "doctor",
        Component: DoctorLayout,
        children: [
          { index: true,           Component: DoctorQueue    },
          { path: "queue",         Component: DoctorQueue    },
          { path: "visit/:id",     Component: VisitWizard    },
          { path: "reports",       Component: DoctorReports  },
          { path: "templates",     Component: DoctorTemplates},
          { path: "settings",      Component: DoctorSettings },
          { path: "*", loader: () => redirect("/doctor") },
        ],
      },

      // ── Admin portal ─────────────────────────────────────────────────
      {
        path: "admin",
        Component: AdminLayout,
        children: [
          { index: true,     Component: AdminDashboard },
          { path: "users",   Component: UserManagement },
          { path: "audit",   Component: AuditLog       },
          { path: "settings",Component: ClinicSettings },
          { path: "*", loader: () => redirect("/admin") },
        ],
      },

      // ── Global fallback ──────────────────────────────────────────────
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
