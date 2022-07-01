import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout, NotFoundPage } from "./pages/";
import PrivateRoute from "./utils/PrivateRoute";
import AlertMessage from "./component/AlertMessage";
import LazyLoading from "./component/LazyLoading";
import { privateRoutesList, publicRoutesList } from "./RoutesList";

const App = () => {
  return (
    <>
      <AlertMessage />
      <BrowserRouter>
        <Routes>
          <Route key="layout" element={<MainLayout />}>
            <Route key="privates" element={<PrivateRoute />}>
              {privateRoutesList.map((route) => (
                <Route
                  key={`route-${route.name}`}
                  path={route.url}
                  element={<Suspense fallback={()=>{<LazyLoading />}}>{route.element}</Suspense>}
                />
              ))}
              {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
            </Route>
            {publicRoutesList.map((route) => (
              <Route 
                key={`route-${route.name}`}
                path={route.url}
                element={<Suspense fallback={()=>{<LazyLoading />}}>{route.element}</Suspense>}
              />
            ))}
            <Route key='route-not-found'  path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
