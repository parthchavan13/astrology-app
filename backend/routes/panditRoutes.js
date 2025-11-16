import express from "express";
import multer from "multer";
import {
  registerPandit,
  loginPandit,
  getAllPandits,
  getPanditDashboard,
  updatePanditStatus,
} from "../controllers/panditController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/register", upload.single("image"), registerPandit);
router.post("/login", loginPandit);
router.get("/getAllPandits", getAllPandits);

router.use((req, res, next) => {
  protect(req, res, () => {
    if (req.user.role !== "pandit") {
      return res.status(403).json({ message: "Pandit access only" });
    }
    next();
  });
});

router.get("/:id/dashboard", getPanditDashboard);

router.patch("/:id/status", updatePanditStatus);

export default router;
