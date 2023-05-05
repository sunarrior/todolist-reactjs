import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CustomRoute } from "./components/CustomRoute";
import Spinner from "./components/Spinner";
import routes from "./pages/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {routes.map(({ path, isPublic, component: Component }) => {
            if (!isPublic) {
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <CustomRoute isPublic={isPublic}>{Component}</CustomRoute>
                  }
                />
              );
            }
            return <Route key={path} path={path} element={<Component />} />;
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
