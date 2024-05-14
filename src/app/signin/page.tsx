import { Button } from "@/components/button";

import { signIn } from "@/auth";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <form
        action={async () => {
          "use server";
          await signIn("keycloak", { redirectTo: "/" });
        }}
      >
        <Button>SignIn To Kailasa</Button>
      </form>
    </div>
  );
};

export default SignInPage;
