import mongoose from "mongoose";
import { dataSchema } from "./data.ts";
import { coordinateSchema } from "./coordinate";

const dataModel = mongoose.models.Data || mongoose.model("Data", dataSchema);
const coordinateModel = mongoose.models.Coordinate || mongoose.model("Coordinate", coordinateSchema);

export const Data = dataModel;
export const Coordinate = coordinateModel;
