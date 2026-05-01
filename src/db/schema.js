import mongoose from "mongoose";
import { dataSchema } from "./data.ts";
import { coordinateSchema, locationSchema } from "./coordinate";
import {
  optimalSolutionSchema,
  optimalSolutionSPSchema,
  optimalSolutionMSTSchema, 
} from "./optimalSolution";

//change the bellow for corresponding collection
const shortestpathDb = mongoose.connection.useDb("shortestpath");
const minimumspanningtreeDb = mongoose.connection.useDb("minimumspanningtree");

const dataMSTModel = minimumspanningtreeDb.models.Data || minimumspanningtreeDb.model("Data", dataSchema);
const locationMSTModel = minimumspanningtreeDb.models.Location || minimumspanningtreeDb.model("Location", locationSchema);
const coordinateMSTModel = minimumspanningtreeDb.models.Coordinate || minimumspanningtreeDb.model("Coordinate", coordinateSchema);
const optimalSolutionMSTModel = minimumspanningtreeDb.models.OptimalSolutionMST || minimumspanningtreeDb.model("OptimalSolutionMST", optimalSolutionMSTSchema);

const dataSPModel =
  shortestpathDb.models.Data || shortestpathDb.model("Data", dataSchema);
const locationSPModel =
  shortestpathDb.models.Location || shortestpathDb.model("Location", locationSchema);
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
export const LocationSP = locationSPModel;
export const Data = dataModel;
export const Coordinate = coordinateModel;
export const OptimalSolution = optimalSolutionModel;
export const Location = locationModel;
export const DataMST = dataMSTModel;
export const CoordinateMST = coordinateMSTModel;
export const LocationMST = locationMSTModel;
export const OptimalSolutionMST = optimalSolutionMSTModel;