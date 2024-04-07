import connectDB from "@/dbConfig/dbConfig";
import sendEmail from "@/helpers/mailer";
import User from "@/models/userModel.js";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// DB Connection
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // check if user already exists
    const user = await User.findOne({ email });
    //if user exists
    if (user) {
      return NextResponse.json(
        { error: "User Already Exists. Please Login" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // save user
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send Verification Email - Todo
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    
    // return response
    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
