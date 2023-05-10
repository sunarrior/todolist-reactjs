import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CustomRoute } from "./components/CustomRoute";
import Spinner from "./components/Spinner";
import routes from "./pages/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="w-screen h-screen">
            <Spinner />
          </div>
        }
      >
        <Routes>
          {routes.map(({ path, isPublic, component: Component }) => {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <CustomRoute path={path} isPublic={isPublic}>
                    {Component}
                  </CustomRoute>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
