import mongoose from "mongoose";
const { Schema, model } = mongoose;

const boardSchema = new Schema({
 
  name: {
    type: String,
    required: true,
    trim: true,
  },

  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

boardSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const Board = model("Board", boardSchema);
export default Board;
