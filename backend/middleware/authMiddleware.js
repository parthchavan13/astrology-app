import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Pandit from "../models/Pandit.js";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
  let token;

  // ----------------------------
  // Extract Bearer token
  // ----------------------------
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 🛡 SAFETY: prevent jwt.verify crash
      if (!token || token === "undefined" || token === "null") {
        return res.status(401).json({ message: "Invalid or missing token" });
      }

      // ----------------------------
      // Decode token
      // ----------------------------
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🛡 SAFETY: token must contain a role
      if (!decoded || !decoded.role) {
        return res.status(401).json({ message: "Invalid token structure" });
      }

      // ----------------------------
      // Role-based auth
      // ----------------------------
      if (decoded.role === "pandit") {
        req.pandit = await Pandit.findById(decoded.id).select("-password");
        if (!req.pandit) {
          return res.status(404).json({ message: "Pandit not found" });
        }
      } 
      else if (decoded.role === "admin") {
        req.admin = await Admin.findById(decoded.id).select("-password");
        if (!req.admin) {
          return res.status(404).json({ message: "Admin not found" });
        }
      }
      else if (decoded.role === "user") {
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
          return res.status(404).json({ message: "User not found" });
        }
      }
      else {
        return res.status(401).json({ message: "Invalid role in token" });
      }

      return next();

    } catch (error) {
      console.error("❌ Token verification error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // ----------------------------
  // No auth header
  // ----------------------------
  return res.status(401).json({ message: "Not authorized, no token" });
};


// =====================================================
// SAFE TOKEN DECODER (No DB Hit)
// =====================================================
export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Token invalid" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};
