
// import { findOne, create } from "../models/user";
// import { genSalt, hash, compare } from "bcryptjs";
// import { sign } from "jsonwebtoken";

// /**
//  * Generate JWT Token
//  */
// const generateToken = (id, role) => {
//   return sign(
//     { id, role },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
//   );
// };

// //  SignUp User

// export async function register(req, res, next) {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     const salt = await genSalt(10);
//     const hashedPassword = await hash(password, salt);

//     const user = await create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     const token = generateToken(user._id, user.role);

//     res.status(201).json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// //  Login User

// export async function login(req, res, next) {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const user = await findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(user._id, user.role);

//     res.status(200).json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// }


// controllers/authController.js

import User from "../models/user.js"; 
import { genSalt, hash, compare } from "bcryptjs";
import sign  from "jsonwebtoken";

/**
 * Generate JWT Token
 */
const generateToken = (id, role) => {
  return sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

// SignUp User
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email }); // ✅ Use model method
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}

// Login User
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }); // ✅ Use model method
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}
