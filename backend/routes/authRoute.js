import express from "express";

import {
  authCheck,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Forgot password route
router.post("/forgotPassword", forgotPassword);

// Reset password route
router.put("/resetPassword/:token", resetPassword);
router.put("/verifyEmail/:token", verifyEmail);

router.get("/authCheck", protectRoute, authCheck);

export default router;
