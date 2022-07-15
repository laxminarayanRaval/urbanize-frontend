import { lazy } from "react";
import { Services } from "./component";

const AccountPage = lazy(() => import("./pages/AccountPage"))
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"))
const DashboardPage = lazy(() => import("./pages/DashboardPage"))
const HomePage = lazy(() => import("./pages/HomePage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"))
const SigninPage = lazy(() => import("./pages/SigninPage"))
const SignupPage = lazy(() => import("./pages/SignupPage"))
const StartProfessionalPage = lazy(() => import("./pages/StartProfessionalPage"))
const TermAndConditionPage = lazy(() => import("./pages/TermAndConditionPage"))


export const privateRoutesList = [
  { name: "Account", url: "/account", element: <AccountPage />},
  { name: "Dashboard", url: "/dashboard", element: <DashboardPage /> },
  { name: "Start as Professional", url: "/start_as_professional", element: <StartProfessionalPage />, },
];
export const publicRoutesList = [
  { name: "Home", url: "/", element: <HomePage /> },
  { name: "Contact Us", url: "/contact_us", element: <ContactUsPage /> },
  { name: "Profile", url: "/profile/:uid/:uname/", element: <ProfilePage />},
  { name: "Reset Password", url: "/reset_password/:uid/:token/", element: <ResetPasswordPage />, },
  { name: "Service", url: "/services/:service_name/:subservice_name/", element: <Services />},
  { name: "Term And ConditionPage", url: "/terms_and_conditions", element: <TermAndConditionPage />},
  { name: "Sign In", url: "/signin", element: <SigninPage /> },
  { name: "Sign Up", url: "/signup", element: <SignupPage /> },
  // { url: "*", element: <NotFoundPage /> },
];
