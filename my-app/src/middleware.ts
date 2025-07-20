import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookie = await cookies();
  if (req.nextUrl.pathname == "/") {
    if (cookie.has("jwt")) {
      return NextResponse.redirect(new URL("/wheel", req.url));
    }
  }
  if (!cookie.has("jwt")) {
    if (req.nextUrl.pathname != "/") {
      return NextResponse.redirect("/");
    }
  }
}
