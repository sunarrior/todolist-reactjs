import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { logoutUser } from "./logout.service";
import { useUser } from "../../context/user.context";

export default function Logout() {
  const { setIsLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await logoutUser();
        localStorage.removeItem("_uobj");
        setIsLoggedIn(false);
        navigate("/login");
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    };
    logout();
  }, []);
}
