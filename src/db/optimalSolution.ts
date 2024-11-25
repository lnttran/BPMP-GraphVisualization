import mongoose from "mongoose";

export interface optimalSolution {
    route: number[], 
    cargo: [number, number][];
    profit: number, 
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