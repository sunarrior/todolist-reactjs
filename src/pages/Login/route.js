import { lazy } from "react";

export default {
  path: "/login",
  isPublic: true,
  component: lazy(() => import(".")),
};
