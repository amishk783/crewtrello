import mongoose from "mongoose";
import { number } from "zod";
const { Schema, model } = mongoose;

const listSchema = new Schema({
  board_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Board",
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },

  position: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

listSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const List = model("List", listSchema);
export default List;
