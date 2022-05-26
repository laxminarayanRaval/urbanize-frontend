import axios from "axios";
import jwtDecode from "jwt-decode";
const BASE_URL = process.env.REACT_APP_API_URL;

const signup = (full_name, email, password, password2) => {
  return axios.post(BASE_URL + "auth/signup/", { full_name, email, password, password2 });
};

const signin = (email, password) => {
  return axios
    .post(BASE_URL + "auth/signin/", { email, password })
    .then((response) => {
      if (response.data) {
        Object.keys(response.data).map((key) => {
          localStorage.setItem(
            key + "_token",
            JSON.stringify(response.data[key])
          );
        });
      }
      const { user_id, full_name, email, role, exp, ...rest } = jwtDecode(
        response.data.access
      );
      return { user_id, full_name, email, role, exp, ...response.data };
    });
};

const signout = () => {
  // first create token blacklist api and call it then clear the localStorage
  localStorage.removeItem("user");
};

const authService = {
  signup,
  signin,
  signout,
};

export default authService;
