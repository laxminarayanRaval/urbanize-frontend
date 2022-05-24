import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  let isAuth = false;
  let location = useLocation();

  if (isAuth) return <Outlet />;

  console.log("Private routes Working");
  return <Navigate to="signin" state={{ from: location }} />;
};

export default PrivateRoute;
