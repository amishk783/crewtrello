import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProfileSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  avatar: String,
  email: String,
  bio: String,
  location: String,
  jobTitle: String,
  company: String,
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProfileSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const Profile = model("Profile", ProfileSchema);
export default Profile;
