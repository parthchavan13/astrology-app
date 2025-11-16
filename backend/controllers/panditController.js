import Pandit from "../models/Pandit.js";
import ChatSession from "../models/chat.js";
import generateToken from "../utils/generateToken.js";

/* =========================================================
     TEMP In-Memory Status Storage (Defined at TOP)
   ========================================================= */
let panditStatuses = {}; // { panditId: true/false }



/* =========================================================
     REGISTER PANDIT
   ========================================================= */
export const registerPandit = async (req, res) => {
  try {
    console.log("📥 Incoming Registration Data:", req.body);
    console.log("🖼 Uploaded file:", req.file?.filename);

    const { name, dob, gender, languages, skills, otherSkill, email } = req.body;

    if (!name || !dob || !gender || !languages || !skills || !email) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const existingPandit = await Pandit.findOne({ email });
    if (existingPandit) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const parsedLanguages =
      typeof languages === "string" ? languages.split(",").map((l) => l.trim()) : languages;

    const parsedSkills =
      typeof skills === "string" ? JSON.parse(skills) : skills;

    const pandit = new Pandit({
      name,
      dob,
      gender,
      languages: parsedLanguages,
      skills: parsedSkills,
      otherSkill,
      email,
      status: "pending",
      createdByAdmin: false,
      isVerified: false,
    });

    if (req.file) pandit.image = `/uploads/${req.file.filename}`;

    await pandit.save();

    console.log("✅ Pandit Registered:", pandit.email);

    return res.status(201).json({
      success: true,
      message: "Registration successful! Await admin approval.",
      data: {
        _id: pandit._id,
        name: pandit.name,
        email: pandit.email,
        image: pandit.image,
        status: pandit.status,
      },
    });
  } catch (error) {
    console.error("❌ Error in registerPandit:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



/* =========================================================
     LOGIN PANDIT  (FIXED)
   ========================================================= */
export const loginPandit = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const pandit = await Pandit.findOne({ email }).select("+password");
    if (!pandit) {
      return res.status(404).json({
        success: false,
        message: "Pandit not found",
      });
    }

    const isMatch = await pandit.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(pandit._id, "pandit");

    console.log(`🔥 Pandit Logged In: ${pandit.email}`);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        _id: pandit._id,
        name: pandit.name,
        email: pandit.email,
        role: pandit.role,
        image: pandit.image || null,
        status: pandit.status,
      },
    });

  } catch (error) {
    console.error("❌ Error in loginPandit:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};



/* =========================================================
     GET ALL PANDITS
   ========================================================= */
export const getAllPandits = async (req, res) => {
  try {
    const pandit = await Pandit.find().select("-password");

    return res.status(200).json({
      success: true,
      count: pandit.length,
      pandit,
    });

  } catch (error) {
    console.error("❌ Error fetching pandit:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



/* =========================================================
     PANDIT DASHBOARD (FIXED — All inside try block)
   ========================================================= */
export const getPanditDashboard = async (req, res) => {
  try {
    const panditId = req.params.id;

    const dashboardData = {
      success: true,
      panditId,

      earnings: {
        today: 120,
        total: 5400,
        wallet: 800,
      },

      profile: {
        completion: 75,
        isOnline: panditStatuses[panditId] ?? false,
      },

      requests: [
        {
          id: "req101",
          user: "Amit Sharma",
          type: "chat",
          time: new Date().toISOString(),
        },
        {
          id: "req102",
          user: "Priya",
          type: "call",
          time: new Date().toISOString(),
        },
      ],

      activeSessions: [
        {
          sessionId: "sess001",
          user: "Rohan",
          type: "call",
          startedAt: new Date(Date.now() - 5 * 60000),
        },
      ],

      recentTransactions: [
        {
          id: "txn201",
          amount: 50,
          type: "chat",
          time: new Date().toISOString(),
        },
        {
          id: "txn202",
          amount: 30,
          type: "call",
          time: new Date().toISOString(),
        },
      ],

      recentHistory: [
        {
          user: "Amit",
          type: "chat",
          duration: 10,
          time: new Date().toISOString(),
        },
        {
          user: "Kunal",
          type: "call",
          duration: 7,
          time: new Date().toISOString(),
        },
      ],
    };

    return res.json(dashboardData);

  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



/* =========================================================
     UPDATE ONLINE/OFFLINE STATUS
   ========================================================= */
export const updatePanditStatus = async (req, res) => {
  try {
    const panditId = req.params.id;
    const { isOnline } = req.body;

    panditStatuses[panditId] = isOnline;

    return res.json({
      success: true,
      panditId,
      isOnline,
      message: `Status updated to ${isOnline ? "Online" : "Offline"}`,
    });
  } catch (error) {
    console.error("❌ Error in updatePanditStatus:", error);
    return res.status(500).json({ error: "Unable to update status" });
  }
};
