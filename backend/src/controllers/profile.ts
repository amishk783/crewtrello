import { Response } from "express";

import Profile from "@/db/schema/Profile";
import { profileValidationSchema } from "@/utils/validationSchema";
import { AuthenticatedRequest } from "@/types";
import { z } from "zod";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log(req.user);
    const profile = await Profile.findOne({ user_id: req.user });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const validatedData = profileValidationSchema.parse(req.body);
    const profile = await Profile.findOneAndUpdate(
      { user_id: req.user },
      validatedData,
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors, message: error.message });
    } else {
      res.status(500).json({ message: "Error updating profile" });
    }
  }
};
