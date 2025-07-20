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

export default async function login(
  state: { errors: ErrorsStateValidator },
  fd: FormData
): Promise<typeof state> {
  const data = {
    password: fd.get("password") as string,
    email: fd.get("email") as string,
  };

  if (!data.password || !data.email) {
    return { errors: { propertyExisted: true } };
  } else if (data.password.length <= 5) {
    return { errors: { passwordLength: true } };
  }
  const findUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (findUser) {
    const hashPasswordFinded = findUser!.password;
    const result = await bcrypt.compare(data.password, hashPasswordFinded);
    if (result) {
      const jwtKey = await jwt.sign(data.password, process.env.SECRET_KEY!);
      const cookie = await cookies();
      cookie.set("jwt", jwtKey, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });
      return { errors: {} };
    }
    return { errors: { hasUser: false } };
  } else {
    return { errors: { hasUser: false } };
  }
}
