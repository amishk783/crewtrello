import mongoose from "mongoose";
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  status: {
    type: String,
    enum: ["todo", "progress", "review", "completed"],
    default: "pending",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  deadline: {
    type: Date,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const Task = model("Task", taskSchema);
export default Task;
