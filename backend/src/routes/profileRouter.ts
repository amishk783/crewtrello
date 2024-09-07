import express from "express";

import { getProfile, updateProfile } from "@/controllers/profile";
const router = express.Router();

router.get("/", getProfile); 
router.post("/", updateProfile);


export const profileRouter = router;
