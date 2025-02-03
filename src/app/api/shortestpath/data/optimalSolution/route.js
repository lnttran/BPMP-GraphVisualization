import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { OptimalSolutionSP } from "@/db/schema"; // Adjust the path as necessary
import { parseOptimalSolutionSP } from "@/components/tools/dataParser"; // Replace with your parser logic if needed

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

      // Parse the content into a valid object (implement this in your parser)
      const data = parseOptimalSolutionSP(fileContent);

      const filename = file.name.replace(/\s+/g, "_");

      const fileJSON = {
        file: filename,
        content: data,
      };

      // Save to the database
      const savedDocument = await OptimalSolutionSP.create(fileJSON);
      fileJSONArray.push(savedDocument);
    } catch (error) {
      console.error("Error occurred: ", error);
      return NextResponse.json(
        { message: "Failed to process files", error: error.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(fileJSONArray, { status: 200 });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { message: "Filename query parameter is required." },
        { status: 400 }
      );
    }

    await connectDB();

    const solution = await OptimalSolutionSP.findOne({ file: filename });

    if (!solution) {
      return NextResponse.json(
        { message: `No solution found for filename: ${filename}` },
        { status: 404 }
      );
    }

    return NextResponse.json(solution, { status: 200 });
  } catch (error) {
    console.error("Error fetching solution by filename: ", error);
    return NextResponse.json(
      { message: "Failed to fetch solution", error: error.message },
      { status: 500 }
    );
  }
}
