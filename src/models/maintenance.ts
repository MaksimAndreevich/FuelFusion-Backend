import { Schema, model } from "mongoose";

export const MaintenanceSchema = new Schema({
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  date: Date,
  type: String,
  description: String,
  cost: Number,
  mileage: Number,
});

export default model("Maintenance", MaintenanceSchema);
