import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout, NotFoundPage } from "./pages/";
import PrivateRoute from "./utils/PrivateRoute";
import AlertMessage from "./component/AlertMessage";
import LazyLoading from "./component/LazyLoading";
import { privateRoutesList, publicRoutesList } from "./RoutesList";

const App = () => {
  console.log(`
  ██╗  ░██╗██████╗░██████╗ ░█████╗░███╗ ░██╗██╗███████╗███████╗
  ██║  ░██║██╔══██╗██╔══██╗██╔══██╗████╗░██║██║╚════██║██╔════╝
  ██║  ░██║██████╔╝██████╦╝███████║██╔██╗██║██║ ░███╔═╝█████╗
  ██║  ░██║██╔══██╗██╔══██╗██╔══██║██║╚████║██║██╔══╝ ░██╔══╝
  ╚██████╔╝██║ ░██║██████╦╝██║ ░██║██║░╚███║██║███████╗███████╗
  ░╚═════╝░╚═╝ ░╚═╝╚═════╝░╚═╝ ░╚═╝╚═╝ ░╚══╝╚═╝╚══════╝╚══════╝`);
  return (
    <>
      <AlertMessage />
      <Router>
        <Suspense fallback={<LazyLoading />}>
          <Routes>
            <Route key="layout" element={<MainLayout />}>
              <Route key="privates" element={<PrivateRoute />}>
                {privateRoutesList.map((route) => (
                  <Route
                    key={`route-${route.name}`}
                    path={route.url}
                    element={route.element}
                  />
                ))}
              </Route>
              {publicRoutesList.map((route) => (
                <Route
                  key={`route-${route.name}`}
                  path={route.url}
                  element={route.element}
                />
              ))}
              <Route
                key="route-not-found"
                path="*"
                element={<NotFoundPage />}
              />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
