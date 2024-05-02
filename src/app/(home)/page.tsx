"use client";

import dynamic from "next/dynamic";

const MessagesPage = dynamic(() => import("@/features/messages/MessagesPage"), {
  ssr: false,
});

export default function Home() {
  return <MessagesPage />;
}
