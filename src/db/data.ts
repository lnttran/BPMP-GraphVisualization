import mongoose from "mongoose"; 
import { coordinate } from "./coordinate";

export interface weightDistant {
    w: number,
    d: number,
    x: number,
    y: number
}

export interface DataItem {
    file: string;
    data: {
      n: number;
      p: number;
      c: number;
      Q: number;
      v: number;
      DIS: number;
      weightDistantData: weightDistant[];
    };
    coordinate: coordinate[];
  }

export const weightDistantSchema = new mongoose.Schema({
    w: Number,
    d: Number,
    x: Number,
    y: Number
}, { _id: false });

export const dataSchema = new mongoose.Schema({
    file: String, 
    content: {
        n: Number,
        p: Number,
        c: Number, 
        Q: Number, 
        v: Number, 
        DIS: Number,
        weightDistantData: [weightDistantSchema]
    }
}, {
    collection: "data"
});