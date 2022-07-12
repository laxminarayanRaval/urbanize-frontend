import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = useSelector((state) => state?.auth?.isAuthenticated);
  let location = useLocation();

  if (isAuth) return <Outlet />;

  console.log("---- Private Routes Checking for Authenticated User ----");
  return <Navigate to="signin" state={{ from: location }} />;
};

export default PrivateRoute;
