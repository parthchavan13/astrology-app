import API from "./api";

export const startChatSession = (userId, panditId) =>
  API.post("/chat/start", { userId, panditId });
