import mongoose from "mongoose";
import { dataSchema } from "./data.ts";
import { coordinateSchema, locationSchema } from "./coordinate";
import {
  optimalSolutionSchema,
  optimalSolutionSPSchema,
} from "./optimalSolution";

//change the bellow for corresponding collection
const shortestpathDb = mongoose.connection.useDb("shortestpath");

const dataSPModel =
  shortestpathDb.models.Data || shortestpathDb.model("Data", dataSchema);
const coordinateSPModel =
  shortestpathDb.models.Coordinate ||
  shortestpathDb.model("Coordinate", coordinateSchema);
const optimalSolutionSPModel =
  shortestpathDb.models.OptimalSolutionSP ||
  shortestpathDb.model("OptimalSolutionSP", optimalSolutionSPSchema);

const dataModel = mongoose.models.Data || mongoose.model("Data", dataSchema);
const locationModel =
  mongoose.models.Location || mongoose.model("Location", locationSchema);
const coordinateModel =
  mongoose.models.Coordinate || mongoose.model("Coordinate", coordinateSchema);
const optimalSolutionModel =
  mongoose.models.OptimalSolution ||
  mongoose.model("OptimalSolution", optimalSolutionSchema);

export const DataSP = dataSPModel;
export const CoordinateSP = coordinateSPModel;
export const OptimalSolutionSP = optimalSolutionSPModel;
export const Data = dataModel;
export const Coordinate = coordinateModel;
export const OptimalSolution = optimalSolutionModel;
export const Location = locationModel;
