import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  let location = useLocation();

  if (isAuth) return <Outlet />;

  console.log("Private routes Working");
  return <Navigate to="signin" state={{ from: location }} />;
};

export default PrivateRoute;
