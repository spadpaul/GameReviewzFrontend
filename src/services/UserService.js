import axios from "axios";
import { authHeader } from "./AuthService";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api/v1/"
    : "https://gamereviewz.link/api/v1/";

const token = JSON.parse(localStorage.getItem("user"))?.token;
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = (id) => {
  return axios.get(API_URL + `auth/user/${id}`, config);
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export const userInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) return user;
};

const addForm = (data) => {
  return axios.post(API_URL + "contact/contactform", data);
};

const addVote = (data) => {
  return axios.put(API_URL + "polls/vote", data, config);
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  userInfo,
  addForm,
  addVote,
};

export default UserService;
