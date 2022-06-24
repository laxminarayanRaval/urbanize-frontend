import axios from "axios";
import jwtDecode from "jwt-decode";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL;

const headers = { headers: authHeader() };

const refreshAuthToken = (refreshToken) =>
  axios.post(API_URL + "/auth/signin/refresh/", { refresh: refreshToken });

const signup = (full_name, email, password, password2) => {
  return axios.post(API_URL + "/auth/signup/", {
    full_name,
    email,
    password,
    password2,
  });
};

const signin = (email, password) => {
  return axios
    .post(`${API_URL}/auth/signin/`, { email, password })
    .then((response) => {
      if (response.data) {
        // Object.keys(response.data).map((key) => {
        // localStorage.setItem(
        // key + "_token",
        // JSON.stringify(response.data[key])
        // );
        // });
        localStorage.setItem("token", JSON.stringify(response.data));
      }
      const { token_type, iat, jti, ...rest } = jwtDecode(response.data.access);
      return { ...rest, ...response.data };
    });
};

const signout = () => {
  // someday create token blacklist api and call it then clear the localStorage
  localStorage.removeItem("user");
};

const changePassword = ({oldpassword, password, password2}) =>{
  debugger
  return (axios.post(
    `${API_URL}/auth/change_password/`,
    {
      oldpassword,
      password,
      password2,
    },
    headers
  ))
}
  

const deactivateAccount = (uid, password) =>
  axios.post(`${API_URL}/auth/deactivate_account`, { uid, password }, headers);

const forgetPassword = (email) =>
  axios.post(`${API_URL}/request/forget_password`, email);
// .then((response) => response.data)
// .catch((error) => {
//   console.log(error);
//   return error.data;
// });

const authService = {
  changePassword,
  deactivateAccount,
  forgetPassword,
  refreshAuthToken,
  signin,
  signout,
  signup,
};

export default authService;
