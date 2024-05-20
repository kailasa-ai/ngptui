"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const HomeLayout = dynamic(() => import("./_homelayout"), {
  ssr: false,
});

const HomePageLayout = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    const model = localStorage.getItem("model");
    if (!model) {
      localStorage.setItem("model", "nithyanandam");
      document.dispatchEvent(new StorageEvent("local-storage"));
    }
  }, []);

  return <HomeLayout>{children}</HomeLayout>;
};

export default HomePageLayout;
