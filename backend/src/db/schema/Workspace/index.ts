import mongoose from "mongoose";
const { Schema, model } = mongoose;

const WorkspaceSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "Profile" },
  createdAt: { type: Date, default: Date.now },
  members: [
    {
      profile: { type: Schema.Types.ObjectId, ref: "Profile" },
      role: { type: String, enum: ["admin", "member"], default: "member" },
    },
  ],
  boards: [{ board: { type: Schema.Types.ObjectId, ref: "Board" } }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
WorkspaceSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const Workspace = model("Organisation", WorkspaceSchema);
export default Workspace;
