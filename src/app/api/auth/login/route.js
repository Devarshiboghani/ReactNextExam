import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/lib/model/User";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const userData = user.toObject();
    delete userData.password;

    return NextResponse.json(
      {
        success: true,
        message: "Login Success....",
        user: userData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
