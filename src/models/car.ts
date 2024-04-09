import { Schema, model } from "mongoose";
import { RefulingSchema } from "./refuling";
import { MaintenanceSchema } from "./maintenance";

export const CarSchema = new Schema({
  name: String,
  year: Number,
  mileage: Number,
  refuelings: [RefulingSchema],
  maintenance: [MaintenanceSchema],
});

export default model("Car", CarSchema);
