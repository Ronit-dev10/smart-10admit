import { useLocation, Navigate } from "react-router-dom";

const allowedRoutes = ["/", "/questionnaire"];

interface RouteGuardProps {
  children: React.ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const location = useLocation();

  if (!allowedRoutes.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
