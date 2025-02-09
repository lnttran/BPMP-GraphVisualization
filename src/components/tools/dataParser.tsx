// import fs from "fs";

import { DataItem, weightDistant } from "@/db/data";

export function convertWeightDistanceData(fileContent: string) {
  try {
    const lines = fileContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    const params: { [key: string]: number } = {};

    let index = 0;
    while (lines[index].startsWith("param")) {
      if (lines[index].includes("d") || lines[index].includes("w")) {
        // index++;
        break;
      }
      const [_, key, value] = lines[index].split(
        /param\s+(\w+)\s*:=\s*([\d.]+);/
      );
      params[key.replace("param ", "")] = parseFloat(value.replace(";", ""));
      index++;
    }
    // Extract "w" and "d" data
    const coordinateData = [];
    let wData = false,
      dData = false,
      wDataMatrix = false,
      dDataMatrix = false;
    const wMap: { [key: string]: number } = {};
    const dMap: { [key: string]: number } = {};

    const isMatrixFormat = (line: string) => /^param\s+w\s*:\s*\d/.test(line);
    const isDMatrixFormat = (line: string) => /^param\s+d\s*:\s*\d/.test(line);

    for (; index < lines.length; index++) {
      const line = lines[index];
      if (line === "param w :=") {
        wData = true;
        continue;
      }
      if (line === "param d :=") {
        wData = false;
        dData = true;
        continue;
      }
      if (isMatrixFormat(line)) {
        wDataMatrix = true;
        continue;
      }
      if (isDMatrixFormat(line)) {
        dDataMatrix = true;
        wDataMatrix = false;
        continue;
      }
      if (line === ";") {
        wData = false;
        dData = false;
        dDataMatrix = false;
        wDataMatrix = false;
        continue;
      }

      // Detect matrix format if line starts with numbers (e.g., "param w:  1 2 3 :=")
      if (wDataMatrix || dDataMatrix) {
        for (; index < lines.length; index++) {
          const dataLine = lines[index];
          if (dataLine === ";") break;

          const data = dataLine.split(/\s+/).map(Number);
          const rowIndex = data[0]; // First value is the row index
          for (let colIndex = 1; colIndex <= data.length - 1; colIndex++) {
            const key = `${rowIndex},${colIndex}`;
            const value = data[colIndex];

            if (wDataMatrix) {
              wMap[key] = value;
            } else if (dDataMatrix) {
              dMap[key] = value;
            }
          }
        }
      }

      if (wData) {
        const [x, y, w] = line.split(/\s+/).map(Number);
        wMap[`${x},${y}`] = w;
        console.log("weight", x, y, w);
      } else if (dData) {
        const [x, y, d] = line.split(/\s+/).map(Number);
        dMap[`${x},${y}`] = d;
        console.log("distance", x, y, d);
      }
    }

    // Combine "w" and "d" into coordinate data
    for (const key in wMap) {
      const [x, y] = key.split(",").map(Number);
      coordinateData.push({
        w: wMap[key],
        d: dMap[key],
        x,
        y,
      });
    }

    // Construct final JSON object
    const jsonData = {
      n: params.n,
      p: params.p,
      c: params.c,
      Q: params.Q,
      v: params.v,
      DIS: params.DIS,
      weightDistantData: coordinateData,
    };

    // console.log("result json: ", jsonData);

    // Connect to MongoDB and post data
    console.log("result json: ", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error converting data:", error);
    return null;
  }
}

export function getNodeCoordinate(fileContent: string) {
  try {
    const lines = fileContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    const coordinateArray = lines.map((line) => {
      const [node, x, y] = line.split(/\s+/); // Split by whitespace

      console.log("get cor", node, x, y);
      // Convert x and y to float and apply scaling
      return {
        node: parseInt(node, 10),
        x: parseFloat(x), // Apply scaling factor
        y: parseFloat(y), // Apply scaling factor
      };
    });

    // console.log("result json: ", jsonData);

    // Connect to MongoDB and post data
    return coordinateArray;
  } catch (error) {
    console.error("Error converting data:", error);
    return null;
  }
}

export function JSONtoText(data: {
  n: number;
  p: number;
  c: number;
  Q: number;
  v: number;
  DIS: number;
  weightDistantData: weightDistant[] | null;
}) {
  // const n = 5;
  // const p = 1.2;
  // const c = 1;
  // const Q = 1;
  // const v = 0.1;
  // const DIS = 20;

  const weightDistantData = data.weightDistantData!;

  // Initialize matrices
  const weightMatrix: number[][] = Array.from({ length: data.n }, () =>
    Array(data.n).fill(0)
  );
  const distanceMatrix: number[][] = Array.from({ length: data.n }, () =>
    Array(data.n).fill(0)
  );

  // Populate matrices from data
  weightDistantData.forEach(({ w, d, x, y }) => {
    weightMatrix[x - 1][y - 1] = w;
    distanceMatrix[x - 1][y - 1] = d;
  });

  // Helper function to format a matrix into the required text format
  const formatMatrix = (matrix: number[][]): string => {
    return (
      matrix
        .map((row, i) => {
          return row
            .map((value, j) => {
              return `${i + 1}\t${j + 1}\t${value}`;
            })
            .join("\n");
        })
        .join("\n") + "\n;"
    );
  };

  // Construct the output text
  const result = [
    `param n:=${data.n};`,
    `param p:=${data.p};`,
    `param c:=${data.c};`,
    `param Q:=${data.Q};`,
    `param v:=${data.v};`,
    `param DIS:=${data.DIS};`,
    `param w :=`,
    formatMatrix(weightMatrix),
    `param d :=`,
    formatMatrix(distanceMatrix),
  ].join("\n");

  return result;
}

export function parseOptimalSolution(fileContent: string) {
  const lines = fileContent.split("\n").filter((line) => line.trim() !== "");

  const route = JSON.parse(lines[0].trim());
  const cargo = JSON.parse(lines[1].trim());
  const profit = parseFloat(lines[2].trim());

  return { route, cargo, profit };
}
export function parseOptimalSolutionSP(fileContent: string) {
  const lines = fileContent.split("\n").filter((line) => line.trim() !== "");

  const totalDist = parseFloat(lines[0].trim());
  const routes = lines.slice(1).map((line) => JSON.parse(line.trim()));

  return { routes, totalDist };
}
