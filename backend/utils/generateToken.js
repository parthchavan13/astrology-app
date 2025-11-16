import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  console.log('ID is:', id, 'Role is:', role);
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;
