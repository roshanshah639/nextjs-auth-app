import { NextResponse } from "next/server";

export async function POST() {
  try {
    //create a response
    const response = NextResponse.json(
      { message: "Logged Out Successfully" },
      { status: 200 }
    );

    // set the cookies
    await response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    // return the response
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
