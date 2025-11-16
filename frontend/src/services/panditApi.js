// src/services/panditApi.js
import API from "./api";

export const getPanditDashboard = async (panditId) => {
  const res = await API.get(`/pandit/${panditId}/dashboard`);
  return res.data;
};

export const updatePanditStatus = async (panditId, isOnline) => {
  const res = await API.patch(`/pandit/${panditId}/status`, { isOnline });
  return res.data;
};

export const getPanditRequests = async (panditId) => {
  const res = await API.get(`/pandit/${panditId}/requests`);
  return res.data;
};

export const getPanditActiveSessions = async (panditId) => {
  const res = await API.get(`/pandit/${panditId}/active-sessions`);
  return res.data;
};

export const getPanditTransactions = async (panditId) => {
  const res = await API.get(`/pandit/${panditId}/transactions`);
  return res.data;
};

export const getPanditHistory = async (panditId) => {
  const res = await API.get(`/pandit/${panditId}/history`);
  return res.data;
};
