import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (uid: Types.ObjectId) => {
  return jwt.sign(
    {
      _id: uid,
    },
    "secret123",
    { expiresIn: "30d" }
  );
};
