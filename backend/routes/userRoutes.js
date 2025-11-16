import express from "express";
import { getUserDashboardData } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------------- PROTECTED USER ROUTES ---------------- */
router.use((req, res, next) => {
  protect(req, res, () => {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "User access only" });
    }
    next();
  });
});

/* ---------------- USER DASHBOARD ---------------- */
router.get("/:id/dashboard", getUserDashboardData);

/* ---------------- USER LOGOUT ---------------- */
router.post("/logout", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful"
  });
});

export default router;
