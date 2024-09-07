import mongoose from "mongoose";
const { Schema, model } = mongoose;

const boardSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  profile_id: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  workspace: { type: Schema.Types.ObjectId, ref: "Organisation" },
  members: [
    {
      memberId: { type: Schema.Types.ObjectId, ref: "Profile" },
      role: {
        type: String,
        enum: ["viewer", "editor", "admin"],
        default: "viewer",
      },
    },
  ],
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
