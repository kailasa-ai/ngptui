import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";

import { Button } from "@/components/button";

import { useSidebar } from "@/hooks/useSidebar";

const Header = () => {
  const { isOpen } = useSidebar();
  const router = useRouter();

  const onNewChat = () => {
    router.push("/");
  };

  return (
    <header className="sticky top-0 mb-1.5 flex items-center gap-4 z-10 h-14 py-2 px-4 font-semibold bg-white">
      {!isOpen && (
        <Button variant="outline" size="icon" onClick={onNewChat}>
          <Edit size={18} />
        </Button>
      )}
      <h2>Nithyananda GPT</h2>
    </header>
  );
};

export default Header;
