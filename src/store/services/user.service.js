import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = process.env.REACT_APP_API_URL;

// to access public APIs
// const getPublicContent = () => axios.get(BASE_URL + "public");

const getServiceList = () => axios.get(BASE_URL + "services/all");
const getSubservicesList = () =>
  axios.get(BASE_URL + "/services/subservices/all");
// to access private APIs
// const getPrivateContent = () =>
// axios.get(BASE_URL + "private", { headers: authHeader() });

const userService = { getServiceList, getSubservicesList };

export default userService;
