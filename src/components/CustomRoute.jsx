import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/user.context";

export function CustomRoute({ isPublic, children: Component }) {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  if (!isPublic) {
    if (!isLoggedIn) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  return Component ? <Component /> : <Outlet />;
}
