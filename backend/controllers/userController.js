import User from "../models/User.js";
import Pandit from "../models/Pandit.js";

// =======================================================
// 🔵 GET USER DASHBOARD
// GET /api/users/:id/dashboard
// =======================================================
export const getUserDashboardData = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("User requesting:", id);

    // Fetch user
    const user = await User.findById(id).select("-password").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch pandit
    const pandit = await Pandit.find()
      .select("name expertise rating")
      .limit(5)
      .lean();

    const dashboardData = {
      user,
      pandit,
      chats: user.chats || [],
    };

    res.status(200).json(dashboardData);

  } catch (err) {
    console.error("Error fetching user dashboard:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// =======================================================
// 🔴 USER LOGOUT CONTROLLER
// POST /api/users/logout
// =======================================================
export const logoutUser = async (req, res) => {
  try {
    const userId = req.user.id; // 🔥 must come from verifyToken
    console.log("Logging out user:", userId);

    await User.findByIdAndUpdate(userId, { isLoggedIn: false });

    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Server error during logout",
      error: error.message,
    });
  }
};
