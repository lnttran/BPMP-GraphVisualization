import { NextResponse } from "next/server";
import { Data } from "@/db/schema";
import { connectDB } from "@/lib/mongodb";

export async function GET(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all documents from the 'data' collection
    const allData = await Data.find({}).lean();

    // Extract filenames from the documents
    const filenames = allData.map((doc) => doc.file).sort((a, b) => a.localeCompare(b)); // Alphebatize file names

    // Return the filenames
    return NextResponse.json(filenames, { status: 200 });
  } catch (error) {
    console.error("Error fetching filenames:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
