import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
const TOKEN_EXPIRATION = "1h";

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const verifyRole = (roles) => (req, res, next) => {
  const userRole = req.user?.role;
  console.log(userRole);

  if (!roles.includes(userRole)) {
    return res.status(403).json({ message: "Accesso denegado." });
  }
  next();
};
