import { Schema, model } from "mongoose";
import { MaintenanceSchema } from "./Maintenance";
import { RefulingSchema } from "./Refuling";

export const CarSchema = new Schema({
  name: String,
  year: Number,
  mileage: Number,
  refuelings: [RefulingSchema],
  maintenance: [MaintenanceSchema],
});

export default model("Car", CarSchema);
