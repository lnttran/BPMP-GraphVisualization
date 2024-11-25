import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Coordinate } from "@/db/schema";
import { getNodeCoordinate } from "@/components/tools/dataParser";

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
      // Read the file content directly from the buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileContent = buffer.toString("utf8");
      const data = getNodeCoordinate(fileContent);

      const filename = file.name
        .replace(/^coordinate_/, "t")
        .replace(/\s+/g, "_");

      // Convert the file content to JSON
      //"coordinate_5_06_data.txt"
      const fileJSON = {
        file: filename,
        content: data,
      };

      await Coordinate.create(fileJSON);
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
