import { NextResponse } from "next/server";
import { DataMST } from "@/db/schema";
import { connectDB } from "@/lib/mongodb";
import { convertWeightDistanceData } from "@/components/tools/dataParser";

export async function POST(request) {
  const formData = await request.formData();
  const files = formData.getAll("files");
  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const fileJSONArray = [];
  await connectDB();
  for (const file of files) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileContent = buffer.toString("utf8");
      const data = convertWeightDistanceData(fileContent);
      const fileJSON = {
        file: file.name.replaceAll(" ", "_"),
        content: data,
      };
      await DataMST.create(fileJSON);
      fileJSONArray.push(fileJSON);
    } catch (error) {
      console.log("Error occurred ", error);
      return NextResponse.json(
        { Message: "Failed to process files", error: error.message },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(fileJSONArray, { status: 200 });
}

export async function GET(request) {
  const fileName = request.nextUrl.searchParams.get("fileName");
  if (fileName === "") {
    try {
      await connectDB();
      const allData = await DataMST.find({}).lean();
      return NextResponse.json(allData, { status: 200 });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  } else {
    try {
      await connectDB();
      const combinedResults = await DataMST.aggregate([
        {
          $match: {
            file: fileName,
          },
        },
        {
          $lookup: {
            from: "coordinate",
            localField: "file",
            foreignField: "file",
            as: "coordinate",
          },
        },
        {
          $unwind: {
            path: "$coordinate",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            file: 1,
            data: "$content",
            coordinate: "$coordinate.content",
          },
        },
      ]);
      return NextResponse.json(combinedResults, { status: 200 });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  }
}