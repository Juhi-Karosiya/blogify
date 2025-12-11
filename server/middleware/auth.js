import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function auth(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader)
    return res.status(401).json({ message: 'No token, authorization denied' });

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use decoded details directly
    req.user = decoded;  // <-- Better: store full decoded payload

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
}
