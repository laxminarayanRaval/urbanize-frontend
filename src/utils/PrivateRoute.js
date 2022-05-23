import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  let isAuthenticated = false;
  let location = useLocation();

  if (isAuthenticated) return <Outlet />;

  console.log("Private routes Working");
  return <Navigate to="signin" state={{ from: location }} />;
};

export default PrivateRoute;
