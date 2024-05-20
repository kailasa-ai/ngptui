import { RedirectType, redirect } from "next/navigation";

import { signOut } from "@/auth";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";

        await signOut({ redirect: false });
        redirect("/signin", RedirectType.replace);
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-2 p-2 text-sm font-semibold rounded-md"
      >
        <span>Logout</span>
      </button>
    </form>
  );
};

export default LogoutButton;
