import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (uid: Types.ObjectId) => {
  return jwt.sign(
    {
      _id: uid,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};
