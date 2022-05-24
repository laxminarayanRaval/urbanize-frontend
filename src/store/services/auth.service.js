import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

const signup = (full_name, email, password) => {
  return axios.post(BASE_URL + "auth/signup", { full_name, email, password });
};

const signin = (email, password) => {
  return axios
    .post(BASE_URL + "auth/signin", { email, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
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
