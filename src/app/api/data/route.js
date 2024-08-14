import { NextResponse } from "next/server";
import { Coordinate, Data } from '@/db/schema';
import { connectDB } from '@/lib/mongodb';
import { convertWeightDistanceData } from "@/components/tools/dataParser";

export async function POST(request) {
  const formData = await request.formData();
  
  const files = formData.getAll("files");
  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const fileJSONArray = [];
  await connectDB();

  console.log(files)

  for (const file of files) {
    try {
      console.log(file)
      // Read the file content directly from the buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileContent = buffer.toString('utf8');
      const data = convertWeightDistanceData(fileContent);
      
      // Convert the file content to JSON
      const fileJSON = {
        file: file.name.replaceAll(" ", "_"),
        content: data
      }
      await Data.create(fileJSON)
      fileJSONArray.push(fileJSON);
      
    } catch (error) {
      console.log("Error occurred ", error);
      return NextResponse.json({ Message: "Failed to process files", error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json(fileJSONArray, { status: 200 });
}

export async function GET(
  request
  ) {
    const fileName = request.nextUrl.searchParams.get('fileName')
    if (fileName === "") {
      try {
          // Connect to MongoDB
          await connectDB();

          // Fetch all documents from the 'data' collection
          const allData = await Data.find({}).lean(); // Using `.lean()` for better performance if you don’t need Mongoose documents

          // Return the fetched data
          return NextResponse.json(allData, { status: 200 });
      } catch (error) {
          console.error("Error fetching data:", error.message);
          return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
      }
  } else {
    try {
      // Connect to MongoDB
      await connectDB();
      
      const combinedResults = await Data.aggregate([
        // Match documents in Data collection by fileName
        {
          $match: {
            file: fileName
          }
        },
        // Perform a left join with the Coordinate collection
        {
          $lookup: {
            from: 'coordinate', // Collection name for coordinates
            localField: 'file',  // Field from Data collection
            foreignField: 'file', // Field from Coordinate collection
            as: 'coordinate' // Field in the output document containing matched Coordinate documents
          }
        },
        // Optionally unwind the 'coordinate' array if you expect a single result per item
        {
          $unwind: {
            path: '$coordinate',
            preserveNullAndEmptyArrays: true // Keep documents from Data even if no match is found
          }
        },
        // Project the desired fields to shape the output
        {
          $project: {
            file: 1,
            data: '$content', // Content from Data collection
            coordinate: '$coordinate.content' // Content from Coordinate collection
          }
        }
      ]);
      
      return NextResponse.json(combinedResults, { status: 200 });
      
  } catch (error) {
      console.error("Error fetching data:", error.message);
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
  }
}