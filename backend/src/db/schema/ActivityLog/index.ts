import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ActivityLogSchema = new Schema({
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },
  actionType: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: Schema.Types.ObjectId,
  description: String,
  performedAt: { type: Date, default: Date.now },
});

const Task = model("Activity", ActivityLogSchema);
export default Task;
