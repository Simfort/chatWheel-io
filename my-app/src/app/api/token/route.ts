import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;
    await jwt.sign(password, process.env.SECRET_KEY!);

    return NextResponse.json("generate token");
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }

    return NextResponse.json("generate token failed");
  }
}
