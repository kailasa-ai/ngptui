"use client";

import dynamic from "next/dynamic";

const HomeLayout = dynamic(() => import("./_homelayout"), {
  ssr: false,
});

const HomePageLayout = ({ children }: React.PropsWithChildren) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default HomePageLayout;
