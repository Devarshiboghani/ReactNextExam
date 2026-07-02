import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Student from "@/lib/model/Student";

// DELETE STUDENT
export async function DELETE(req, context) {
  await connectDB();

  const { id } = await context.params;

  console.log("Deleting:", id);

  const deletedStudent = await Student.findByIdAndDelete(id);

  if (!deletedStudent) {
    return NextResponse.json(
      { message: "Category not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    id,
  });
}

// UPDATE STUDENT
export async function PUT(req, context) {
  await connectDB();

  const { id } = await context.params;
  const body = await req.json();

  const updatedStudent = await Student.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json(updatedStudent);
}

// GET Single Student
export async function GET(req, context) {
  await connectDB();

  const { id } = await context.params;

  const student = await Student.findById(id);

  return NextResponse.json(student);
}
