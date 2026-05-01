import { NextResponse } from "next/server";
import { DataMST } from "@/db/schema";
import { connectDB } from "@/lib/mongodb";

export async function GET(request) {
  try {
    await connectDB();
    const allData = await DataMST.find({}).lean();
    const filenames = allData.map((doc) => doc.file).sort((a, b) => a.localeCompare(b));
    return NextResponse.json(filenames, { status: 200 });
  } catch (error) {
    console.error("Error fetching filenames:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}