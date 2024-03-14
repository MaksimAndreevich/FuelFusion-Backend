import { Schema, model } from "mongoose";
import { RefulingSchema } from "./refuling";
import { MaintenanceSchema } from "./maintenance";

export const CarSchema = new Schema({
  make: String,
  model: String,
  year: Number,
  refuelings: [RefulingSchema],
  maintenance: [MaintenanceSchema],
});

export default model("Car", CarSchema);
