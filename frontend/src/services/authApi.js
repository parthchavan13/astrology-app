import API from "./api";

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  return true;
};

export const loginPandit = async (data) => {
  const res = await API.post("/pandit/login", data);
  return res.data;
};

export const registerPandit = async (formData) => {
  const res = await API.post("/pandit/register", formData);
  return res.data;
};

export const loginAdmin = async (data) => {
  const res = await API.post("/admin/login", data);
  return res.data;
};

export const registerAdmin = async (data) => {
  const res = await API.post("/admin/register", data);
  return res.data;
};
