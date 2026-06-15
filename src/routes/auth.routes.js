import { Router } from "express";
import { getCurrentUser, login, register, updateProfile } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", protect, getCurrentUser);
router.put("/profile", protect, updateProfile);

export default router;
