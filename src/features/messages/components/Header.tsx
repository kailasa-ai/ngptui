"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit, LogOut } from "lucide-react";

import { Button } from "@/components/button";
import ModelsDropdown from "./ModelsDropdown";

import { useSidebar } from "@/hooks/useSidebar";
import useDevice from "@/hooks/useDevice";

const Header = () => {
  const { isCollapsed } = useSidebar();
  const router = useRouter();
  const { isMobile } = useDevice();

  const onNewChat = () => {
    router.push("/");
  };

  return (
    <header className="sticky top-0 mb-1.5 flex items-center justify-between gap-4 z-10 h-14 py-2 px-4 font-semibold bg-white">
      <div className="flex items-center gap-4">
        {isCollapsed && !isMobile && (
          <Button variant="outline" size="icon" onClick={onNewChat}>
            <Edit size={18} />
          </Button>
        )}
        <ModelsDropdown />
      </div>
      <Link
        href="/logout"
        passHref
        className="flex items-center gap-2 p-2 text-sm font-semibold rounded-md hover:bg-gray-100"
        aria-label="Logout"
      >
        <LogOut size={18} />
      </Link>
    </header>
  );
};

export default Header;
