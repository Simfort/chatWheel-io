"use server";
import bcrypt from "bcrypt";
import prisma from "../../../prisma/seed.";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type ErrorsStateValidator = {
  hasUser?: boolean;
  passwordLength?: boolean;
  propertyExisted?: boolean;
};

export default async function signup(
  state: { errors: ErrorsStateValidator },
  fd: FormData
): Promise<typeof state> {
  const data = {
    username: fd.get("username") as string,
    password: fd.get("password") as string,
    email: fd.get("email") as string,
  };
  console.log(data);
  if (!data.username || !data.password || !data.email) {
    return { errors: { propertyExisted: true } };
  } else if (data.password.length <= 5) {
    return { errors: { passwordLength: true } };
  }
  const findUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: data.username }, { email: data.email }],
    },
  });

  if (findUser) {
    return { errors: { hasUser: true } };
  } else {
    const hashPassword = await bcrypt.hash(data.password, 10);
    await prisma.user.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });

    const jwtKey = jwt.sign(data.password, process.env.SECRET_KEY!);
    const cookie = await cookies();
    cookie.set("jwt", jwtKey, {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    return { errors: {} };
  }
}
