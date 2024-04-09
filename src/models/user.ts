import { Schema, model } from "mongoose";
import { CarSchema } from "./car";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    cars: [CarSchema],
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
