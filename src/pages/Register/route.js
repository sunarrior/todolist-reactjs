import { lazy } from "react";

export default {
  path: "/register",
  isPublic: true,
  component: lazy(() => import(".")),
};
