import API from "../services/api";

export async function logout() {
  console.log("🔥 logout() called!");
  console.trace();
  console.log("🟥 LOGOUT TRIGGERED — route:", window.location.pathname);
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await API.post(
        "/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  } catch (err) {
    console.warn("⚠️ Backend logout failed:", err.message);
  }

  // Read role BEFORE clearing
  const role = localStorage.getItem("role");

  // Clear all tokens and session data
  localStorage.clear();

  // Role-based redirect (🔥 FIX)
  if (role === "pandit") {
    window.location.href = "/pandit/login";
  } else if (role === "admin") {
    window.location.href = "/admin/login";
  } else {
    window.location.href = "/user/login";
  }
}

export function isTokenExpired() {
  const expiry = localStorage.getItem("tokenExpiry");

  // Not logged in → not expired
  if (!expiry) return false;

  return Date.now() > parseInt(expiry);
}
