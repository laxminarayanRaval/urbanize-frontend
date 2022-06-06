import {
  AccountPage,
  ContactUsPage,
  DashboardPage,
  HomePage,
  ProfilePage,
  ResetPasswordPage,
  SigninPage,
  SignupPage,
  StartProfessionalPage,
} from "./pages/";

export const privateRoutesList = [
  { name: "Account", url: "/account", element: <AccountPage />},
  { name: "Dashboard", url: "/dashboard", element: <DashboardPage /> },
  { name: "Profile", url: "/profile/:uname/:uid/", element: <ProfilePage />},
  { name: "Start as Professional", url: "/start_as_professional", element: <StartProfessionalPage />, },
];
export const publicRoutesList = [
  { name: "Home", url: "/", element: <HomePage /> },
  { name: "Contact Us", url: "/contact_us", element: <ContactUsPage /> },
  { name: "Reset Password", url: "/reset_password/:uid/:token/", element: <ResetPasswordPage />, },
  { name: "Sign In", url: "/signin", element: <SigninPage /> },
  { name: "Sign Up", url: "/signup", element: <SignupPage /> },
  // { url: "*", element: <NotFoundPage /> },
];
