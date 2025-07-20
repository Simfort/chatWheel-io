"use client";
import { X } from "lucide-react";
import { useActionState } from "react";
import { createPortal } from "react-dom";
import signup from "../lib/signup";

export default function SignUpModal({
  setSignFlag,
  setLogFlag,
}: {
  setSignFlag: (arg: boolean) => void;
  setLogFlag: (arg: boolean) => void;
}) {
  const [state, action] = useActionState(signup, {
    errors: {},
  });
  const handleOpenOtherModal = () => {
    setSignFlag(false);
    setLogFlag(true);
  };
  return createPortal(
    <div id="modal">
      <form
        className="gap-10 text-black bg-white flex flex-col pt-5 pb-5 pl-10 pr-10 rounded-[10px]"
        action={action}>
        <button
          className="cursor-pointer w-[30px] hover:opacity-65"
          onClick={() => setSignFlag(false)}
          type="button">
          <X size={30} />
        </button>
        <h3>Sign Up</h3>
        <label htmlFor="username">
          Username
          <input
            className="border-2 pl-2 border-(--color-foreground) pt-1 pb-1 rounded-[10px]  w-1/1 "
            type="text"
            name="username"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            className="border-2 pl-2 pt-1 border-(--color-foreground) pb-1 rounded-[10px]  w-1/1 "
            type="email"
            name="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            className="border-2 pl-2 border-(--color-foreground) pt-1 pb-1 rounded-[10px]  w-1/1 "
            type="password"
            name="password"
          />
        </label>
        <ul>
          {state.errors.passwordLength && (
            <li className="text-red-500">Min password length is 6.</li>
          )}
          {state.errors.propertyExisted && (
            <li className="text-red-500">One of some property is existed.</li>
          )}
          {state.errors.hasUser && (
            <li className="text-red-500">Username or email is used.</li>
          )}
        </ul>
        <p>
          If you have registered account,just{" "}
          <button
            className="text-(--color-foreground) cursor-pointer underline "
            onClick={handleOpenOtherModal}>
            log in
          </button>{" "}
          him.{" "}
        </p>
        <button
          className="cursor-pointer border-2 border-(--color-foreground) bg-(--color-foreground) text-white p-3 rounded-[10px] transition-colors delay-100 hover:text-(--color-foreground) hover:border-2 hover:border-(--color-foreground) hover:bg-white active:opacity-40"
          type="submit">
          Sign Up
        </button>
      </form>
    </div>,
    document.body!
  );
}
