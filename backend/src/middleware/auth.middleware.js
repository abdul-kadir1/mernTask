import { verify } from "jsonwebtoken";
import { findById } from "../models/user.js";

export async function protect(req, res, next) {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = await findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
}
