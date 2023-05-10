import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/user.context";

export function CustomRoute({ path, isPublic, children: Component }) {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  if (!isPublic) {
    if (!isLoggedIn) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  const redirectIfLoggedIn = ["/register", "/login"];
  if (isLoggedIn) {
    if (redirectIfLoggedIn.includes(path)) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return Component ? <Component /> : null;
}
