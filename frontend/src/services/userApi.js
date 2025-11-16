import API from "./api";

export const getUserDashboard = async () => {
  const res = await API.get("/user/dashboard");
  return res.data;
};