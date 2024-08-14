// import fs from "fs";

export function convertWeightDistanceData(fileContent: string) {
  try {
    const lines = fileContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    const params: { [key: string]: number } = {};

    let index = 0;
    while (lines[index].startsWith("param")) {
      if (lines[index].includes("d :=") || lines[index].includes("w :=")) {
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
      dData = false;
    const wMap: { [key: string]: number } = {};
    const dMap: { [key: string]: number } = {};

    for (; index < lines.length; index++) {
      const line = lines[index];
      console.log(line);
      if (line === "param w :=") {
        wData = true;
        continue;
      }
      if (line === "param d :=") {
        wData = false;
        dData = true;
        continue;
      }
      if (line === ";") {
        wData = false;
        dData = false;
        continue;
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
