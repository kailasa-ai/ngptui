"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const HomeLayout = dynamic(() => import("./_homelayout"), {
  ssr: false,
});

const HomePageLayout = ({
  children,
  ...props
}: React.PropsWithChildren<{ signout: React.ReactNode }>) => {
  useEffect(() => {
    const model = localStorage.getItem("model");

    // NOTE: we are setting the default model here
    if (!model) {
      localStorage.setItem("model", "nithyanandam");
      document.dispatchEvent(new StorageEvent("local-storage"));
    }
  }, []);

  return (
    <HomeLayout>
      {children}
      {props.signout}
    </HomeLayout>
  );
};

export default HomePageLayout;
