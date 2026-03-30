import { Outlet, useRouteError, isRouteErrorResponse, Navigate } from "react-router";

export function Root() {
  return <Outlet />;
}

/**
 * Catches 404s caused by environment-specific route-matching failures and
 * redirects to the correct portal root based on the URL prefix.
 */
export function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    if (path.startsWith("/doctor"))  return <Navigate to="/doctor"  replace />;
    if (path.startsWith("/patient")) return <Navigate to="/patient" replace />;
    if (path.startsWith("/admin"))   return <Navigate to="/admin"   replace />;
    return <Navigate to="/" replace />;
  }

  // Non-404 errors: show minimal message
  const msg = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
    ? error.message
    : "Unknown error";

  return (
    <div className="flex items-center justify-center h-screen text-red-600">
      <p>{msg}</p>
    </div>
  );
}
