import { lazy } from "react";

export default {
  path: "/",
  isPublic: false,
  component: lazy(() => import(".")),
};
