import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

// to access public APIs
// const getPublicContent = () => axios.get(API_URL + "public");

const getServiceList = () => axios.get(API_URL + "/services/all");

const getSubservicesList = () =>
  axios.get(API_URL + "/services/sub_services/all");

// to access private APIs
// const getPrivateContent = () =>
// axios.get(API_URL + "private", { headers: authHeader() });

const userService = { getServiceList, getSubservicesList };

export default userService;
