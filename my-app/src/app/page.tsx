"use client";
import { useEffect, useState } from "react";
import NonAuth from "./ui/NonAuth";
import cookiesFormat from "./lib/cookiesFormat";

export default function Home() {
  const [hasJwt, setHasJwt] = useState(false);
  useEffect(() => {
    if (window) {
      const cookies = cookiesFormat(document.cookie);
      const jwt = cookies["jwt"];
      setHasJwt(jwt ? true : false);
    }
  }, []);
  return <div>{hasJwt ? "" : <NonAuth />}</div>;
}
