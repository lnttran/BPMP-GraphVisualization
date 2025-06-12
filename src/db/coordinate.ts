import mongoose from "mongoose";

export interface coordinate {
  node: number;
  location?: string;
  x: number;
  y: number;
}

export const locationSchema = new mongoose.Schema(
  {
    file: String,
    content: Object,
  },
  {
    collection: "location",
  }
);

export const coordinateSchema = new mongoose.Schema(
  {
    file: String,
    content: [
      {
        node: Number,
        x: Number,
        y: Number,
        _id: false,
      },
    ],
  },
  {
    collection: "coordinate",
  }
);
