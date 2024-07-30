import mongoose from "mongoose";
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Under Review", "Completed"],
    default: "To Do",
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
    required: false,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "Urgent"],
    required: false,
  },
  deadline: {
    type: Date,
    required: false,
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
