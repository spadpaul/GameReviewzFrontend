import axios from "axios";

const token = JSON.parse(localStorage.getItem("user"))?.token;

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const ADMIN_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api/v1/admindashboard"
    : "https://gamereviewz.link/api/v1/admindashboard";

const getContactTable = () => {
  return axios.get(`${ADMIN_URL}/contact`, config);
};

const getGameArticlesTable = () => {
  return axios.get(`${ADMIN_URL}/gamesarticles`, config);
};

const getGameReviewsTable = () => {
  return axios.get(`${ADMIN_URL}/gamesreviews`, config);
};

const getImagesTable = () => {
  return axios.get(`${ADMIN_URL}/images`, config);
};

const getPollsTable = () => {
  return axios.get(`${ADMIN_URL}/polls`, config);
};

const getTechArticlesTable = () => {
  return axios.get(`${ADMIN_URL}/techarticles`, config);
};

const getTechReviewsTable = () => {
  return axios.get(`${ADMIN_URL}/techreviews`, config);
};

const getUsersTable = () => {
  return axios.get(`${ADMIN_URL}/users`, config);
};

const AdminService = {
  getContactTable,
  getGameArticlesTable,
  getGameReviewsTable,
  getImagesTable,
  getPollsTable,
  getTechArticlesTable,
  getTechReviewsTable,
  getUsersTable,
};
export default AdminService;
