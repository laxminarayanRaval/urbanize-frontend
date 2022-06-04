import {
  ContactUsPage,
  DashboardPage,
  HomePage,
  ResetPasswordPage,
  StartProfessionalPage,
  SigninPage,
  SignupPage,
} from "./pages/";

export const privateRoutesList = [
  { name: "dashboard", url: "/dashboard", element: <DashboardPage /> },
  { name: "Start as Professional", url: "/start_as_professional", element: <StartProfessionalPage />, },
];
export const publicRoutesList = [
  { name: "Home", url: "/", element: <HomePage /> },
  { name: "Sign In", url: "/signin", element: <SigninPage /> },
  { name: "Sign Up", url: "/signup", element: <SignupPage /> },
  { name: "Contact Us", url: "/contact_us", element: <ContactUsPage /> },
  { name: "Reset Password", url: "/reset_password/:uid/:token/", element: <ResetPasswordPage />, },
  // { url: "*", element: <NotFoundPage /> },
];
