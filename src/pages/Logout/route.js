import { lazy } from "react";

export default {
  path: "/logout",
  isPublic: false,
  component: lazy(() => import(".")),
};
