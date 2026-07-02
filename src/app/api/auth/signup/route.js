import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/connectDB";
import User from "@/lib/model/User";

export async function POST(req) {
  try {
    await connectDB();

    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      profileImage,
    } = await req.json();

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password and confirm password do not match",
        },
        {
          status: 400,
        },
      );
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profileImage: profileImage || "",
    });

    const userData = user.toObject();
    delete userData.password;

    return NextResponse.json({
      success: true,
      message: "Signup Successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
