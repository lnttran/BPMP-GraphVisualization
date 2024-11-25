import mongoose from "mongoose";
import { dataSchema } from "./data.ts";
import { coordinateSchema } from "./coordinate";
import { optimalSolutionSchema } from "./optimalSolution";

const dataModel = mongoose.models.Data || mongoose.model("Data", dataSchema);
const coordinateModel =
  mongoose.models.Coordinate || mongoose.model("Coordinate", coordinateSchema);
const optimalSolutionModel =
  mongoose.models.OptimalSolution ||
  mongoose.model("OptimalSolution", optimalSolutionSchema);

export const Data = dataModel;
export const Coordinate = coordinateModel;
export const OptimalSolution = optimalSolutionModel;
