import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Spinner from "./components/Spinner";

import routes from "./pages/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {routes.map(({ path, isPublic, component: Component }) => {
            return <Route path={path} element={<Component />} />;
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
