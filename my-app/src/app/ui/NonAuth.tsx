"use client";

import { useState } from "react";
import Thunder from "./Thunder";
import { createPortal } from "react-dom";
import SignUpModal from "./SignUpModal";
import LogInModal from "./LogInModal";

export default function NonAuth() {
  const [signFlag, setSignFlag] = useState(false);
  const [logFlag, setLogFlag] = useState(false);
  return (
    <div className="p-5 flex  flex-col justify-center h-screen">
      {signFlag && (
        <SignUpModal setLogFlag={setLogFlag} setSignFlag={setSignFlag} />
      )}
      {logFlag && (
        <LogInModal setLogFlag={setLogFlag} setSignFlag={setSignFlag} />
      )}
      <div className="flex justify-between ">
        <h1 className="w-[500px]">
          Welcome to the ChatWheel.io.If you want start you must authorezed!
        </h1>
        <Thunder />
      </div>
      <div className="flex gap-5">
        <button
          onClick={() => setSignFlag(true)}
          className="bg-(--color-foreground) text-white w-[150px] h-[50px] cursor-pointer rounded-[10px] font-bold transition-[opacity] delay-75 hover:opacity-60">
          Sign Up
        </button>
        <button
          onClick={() => setLogFlag(true)}
          className=" w-[150px] h-[50px] transition-[opacity] cursor-pointer cursor-pointerfont-bold  hover:opacity-60">
          Log In
        </button>
      </div>
    </div>
  );
}
