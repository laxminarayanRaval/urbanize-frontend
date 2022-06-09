import axios from "axios";
import authHeader from "./auth-header";
const headers = { headers: authHeader() };

const API_URL = process.env.REACT_APP_API_URL;

// to access public APIs
// const getPublicContent = () => axios.get(API_URL + "public");

const getServiceList = () => axios.get(API_URL + "/services/all");

const getSubservicesList = () =>
  axios.get(API_URL + "/services/sub_services/all");

// to access private APIs
// const getPrivateContent = () =>
// axios.get(API_URL + "private", { headers: authHeader() });

const updateContactDetails = (data) =>
  axios.put(`${API_URL}/request/update/contact_details/`, data, headers);

const userService = {
  getServiceList,
  getSubservicesList,
  updateContactDetails,
};

export default userService;
