import mongoose from "mongoose"; 

export interface coordinate {
    node: number,
    x: number,
    y: number
}


export const coordinateSchema = new mongoose.Schema({
    file: String, 
    content: [
        {
            node: Number,
            x: Number,
            y: Number,
            _id: false
        }
    ]
}, {
    collection: "coordinate"
}, );