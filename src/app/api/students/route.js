import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Student from "@/lib/model/Student";

// GET All Students
export async function GET() {
  try {
    await connectDB();

    const students = await Student.find();

    return NextResponse.json(
      {
        success: true,
        students,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

// ADD Student
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const student = await Student.create(body);

    return NextResponse.json(
      {
        success: true,
        student,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
