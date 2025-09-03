import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { LocationSP } from "@/db/schema";

export async function GET(request) {
  try {
    // Parse query parameter
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json(
        { message: "Missing fileName parameter" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Find document by file name
    const document = await LocationSP.findOne({ file: fileName }).lean();

    if (!document) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }
    return NextResponse.json(document.content, { status: 200 });
  } catch (error) {
    console.error("Error fetching content:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}