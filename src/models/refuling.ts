import { Schema, model } from "mongoose";

export const RefulingSchema = new Schema({
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  date: Date,
  fuelType: String,
  liters: Number,
  pricePerLiter: Number,
  totalCost: Number,
  mileage: Number,
});

export default model("Refueling", RefulingSchema);
