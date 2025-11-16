import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// ============================
// REGISTER USER
// ============================
export const registerUser = async (req, res) => {
  try {
    const { email, password, phoneNo, address, dateOfBirth, placeOfBirth } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      email,
      password,
      phoneNo,
      address,
      dateOfBirth,
      placeOfBirth,
    });

    const token = generateToken(user._id, "user");

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      data: {
        _id: user._id,
        email: user.email,
        phoneNo: user.phoneNo,
      },
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ============================
// LOGIN USER
// ============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id, "user");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        _id: user._id,
        email: user.email,
        phoneNo: user.phoneNo,
      },
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ============================
// LOGOUT USER
// ============================
export const logoutUser = async (req, res) => {
  return res.status(200).json({ success: true, message: "Logged out" });
};
