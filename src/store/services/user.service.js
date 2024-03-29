import axios from "axios";
import authHeader from "./auth-header";
const headers = { headers: authHeader() };

const API_URL = process.env.REACT_APP_API_URL;

// to access public APIs
// const getPublicContent = () => axios.get(API_URL + "public");

const getServiceList = () => axios.get(API_URL + "/services/all");

const getSubservicesList = () =>
  axios.get(API_URL + "/services/sub_services/all");

const getAllServicesList = () => axios.get(`${API_URL}/services/list_all/`);

const getProfessionalService = (id) =>
  axios.get(`${API_URL}/user/professional/${id}/`);
// .then((response) => ({ ...response }));

const getUserDetailsById = async (id) =>
  await axios
    .get(`${API_URL}/user/details/${id}/`)
    .then((response) => ({ ...response }));

// to access private APIs
// const getPrivateContent = () =>
// axios.get(API_URL + "private", { headers: authHeader() });

const updateContactDetails = (data) =>
  axios.put(`${API_URL}/user/contact_details/`, data, headers);

const beingUserProfessional = (data) =>
  axios.post(`${API_URL}/user/professional/`, data, headers);

const makeUserProfessional = (data, uid) =>
  axios.post(`${API_URL}/user/professional/${uid}/`, data, headers);

const professionalServiceListing = (data) => {
  // console.log(data);
  return axios.post(`${API_URL}/professional/services_list/`, data, headers);
};
const getUserDetails = async (user_id) =>
  await axios
    .get(`${API_URL}/user/details/${user_id ? user_id + "/" : ""}`, headers)
    .then((response) => ({ ...response }));

const hireProfessionalService = (data) => {
  console.log(data);
  return axios.post(`${API_URL}/hire/professional/`, data, headers);
};

// /user/requirement/

const getAllUserRequirements = async () =>
  axios.get(`${API_URL}/user/requirement/`, headers);

const postUserRequirements = async (data) =>
  axios.post(`${API_URL}/user/requirement/`, data, headers);

const patchUserRequirements = async (id, data) =>
  axios.patch(`${API_URL}/user/requirement/${id}/`, data, headers);

const userService = {
  beingUserProfessional,
  getAllServicesList,
  getAllUserRequirements,
  getProfessionalService,
  getServiceList,
  getSubservicesList,
  getUserDetails,
  getUserDetailsById,
  hireProfessionalService,
  patchUserRequirements,
  postUserRequirements,
  professionalServiceListing,
  updateContactDetails,
};

export default userService;
