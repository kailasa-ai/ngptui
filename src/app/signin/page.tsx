import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/button";

import { auth, signIn } from "@/auth";

import { cn } from "@/lib/utils";

import emblem from "../../../public/kailasa-emblem.webp";

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="h-full w-full flex items-center justify-center bg-[#f7f7f7]">
      <form
        action={async () => {
          "use server";
          const redirectUrl = await signIn("keycloak", { redirect: false });

          redirect(redirectUrl);
        }}
        className={cn(
          "flex flex-col items-center w-auto h-auto bg-white p-10",
          "max-w-md w-full sm:w-[448px] rounded-lg sm:shadow-lg transform transition-transform duration-300 ease-in-out h-[448px]"
        )}
      >
        <Image
          src={emblem}
          alt="emblem"
          width={220}
          height={220}
          className="mb-5"
        />
        <Button
          type="submit"
          size="lg"
          className="bg-[#420d00] text-white hover:bg-[#BA3C27]"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
