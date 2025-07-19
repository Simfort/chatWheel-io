import { X } from "lucide-react";
import { createPortal } from "react-dom";

export default function LogInModal({
  setSignFlag,
  setLogFlag,
}: {
  setSignFlag: (arg: boolean) => void;
  setLogFlag: (arg: boolean) => void;
}) {
  const handleOpenOtherModal = () => {
    setSignFlag(true);
    setLogFlag(false);
  };
  return createPortal(
    <div id="modal">
      <form
        className="gap-10 text-black bg-white flex flex-col pt-5 pb-5 pl-10 pr-10 rounded-[10px]"
        action="">
        <button
          className="cursor-pointer w-[30px] hover:opacity-65"
          onClick={() => setLogFlag(false)}
          type="button">
          <X size={30} />
        </button>
        <h3>Log In</h3>
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
        <p>
          If you haven`t`account,just{" "}
          <button
            className="text-(--color-foreground) cursor-pointer underline "
            onClick={handleOpenOtherModal}>
            sign up
          </button>
          .
        </p>
        <button
          className="cursor-pointer border-2 border-(--color-foreground) bg-(--color-foreground) text-white p-3 rounded-[10px] transition-colors delay-100 hover:text-(--color-foreground) hover:border-2 hover:border-(--color-foreground) hover:bg-white active:opacity-40"
          type="submit">
          Log In
        </button>
      </form>
    </div>,
    document.body!
  );
}
