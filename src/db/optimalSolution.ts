import mongoose from "mongoose";


export interface optimalSolution {
    route: number[], 
    cargo: [number, number][];
    profit: number, 
}
export interface optimalSolutionSP {
    route: number[], 
    totalDist: number, 
}
export const optimalSolutionSchema = new mongoose.Schema({
    file: String, 
    content: {
        route: [Number], 
        cargo: [[Number]],
        profit: Number,
    }
}, {
    collection: "optimalSolution",
    versionKey: false,
})

export const optimalSolutionSPSchema = new mongoose.Schema({
    file: String, 
    content: {
        totalDist: Number,
        routes: [[Number]], 
    }
}, {
    collection: "optimalSolutionSP",
    versionKey: false,
})

export interface optimalSolutionMST {
  totalWeight: number;
  edges: [number, number][];
}

export const optimalSolutionMSTSchema = new mongoose.Schema({
  file: String,
  content: {
    totalWeight: Number,
    edges: [[Number]],
  }
}, {
  collection: "optimalSolutionMST",
  versionKey: false,
})