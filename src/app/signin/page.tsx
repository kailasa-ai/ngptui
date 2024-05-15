import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/button";

import { auth, signIn } from "@/auth";

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("keycloak", { redirectTo: "/" });
        }}
        className="-translate-y-[100px] flex flex-col items-center justify-center w-auto h-auto:"
      >
        <Image src="/ai.png" alt="AI" width={300} height={300} />
        <Button
          type="submit"
          size="lg"
          className="bg-[#D63C1A] text-white hover:bg-[#BA3C27]"
        >
          SignIn To Kailasa
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
