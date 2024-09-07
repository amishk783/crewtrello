import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cardSchema = new Schema({
  status: {
    type: String,
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
  assignees: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  attachments: [
    {
      fileName: String,
      filePath: String,
      fileType: String,
      fileSize: Number,
      uploadedBy: { type: Schema.Types.ObjectId, ref: "Profile" },
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      content: { type: String, required: true },
      createdBy: { type: Schema.Types.ObjectId, ref: "Profile" },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  list_id: { type: Schema.Types.ObjectId, ref: "List" },
  board_id: { type: Schema.Types.ObjectId, ref: "Board" },
  user_id: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const Card = model("Card", cardSchema);
export default Card;
