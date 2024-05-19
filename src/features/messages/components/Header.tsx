"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronDown, Edit } from "lucide-react";

import { Button } from "@/components/button";

import { useSidebar } from "@/hooks/useSidebar";
import useDevice from "@/hooks/useDevice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from "@/components/dropdown-menu";
import { useAvatarModel } from "@/hooks/useAvatarModel";

const models = [
  {
    name: "Ask Nithyananda",
    id: "nithyanandam",
  },
  {
    name: "Yoga Pada",
    id: "yoga-pada",
  },
  {
    name: "Kriya Pada",
    id: "kriya-pada",
  },
  {
    name: "Chariya Pada",
    id: "chariya-pada",
  },
];

const Header = () => {
  const { isCollapsed } = useSidebar();
  const router = useRouter();
  const { isMobile } = useDevice();
  const avatarModel = useAvatarModel();
  const params = useParams<{ id?: string }>();

  const onNewChat = () => {
    router.push("/");
  };
  const currentModel = models.find((model) => model.id === avatarModel);

  return (
    <header className="sticky top-0 mb-1.5 flex items-center gap-4 z-10 h-14 py-2 px-4 font-semibold bg-white">
      {isCollapsed && !isMobile && (
        <Button variant="outline" size="icon" onClick={onNewChat}>
          <Edit size={18} />
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={!!params.id}
          className="flex items-center gap-2 group outline-none"
        >
          <h2 className="text-lg font-medium">{currentModel?.name}</h2>
          {!params.id && (
            <ChevronDown
              size={18}
              className="group-data-[state=open]:-rotate-180 transition-transform duration-200"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-normal">
          <DropdownMenuLabel className="font-normal text-xs text-gray-500">
            Model
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={avatarModel}
            onValueChange={(value) => {
              localStorage.setItem("model", value);
              document.dispatchEvent(new StorageEvent("local-storage"));
            }}
          >
            {models.map((model) => {
              return (
                <DropdownMenuRadioItem
                  key={model.id}
                  value={model.id}
                  className="cursor-pointer"
                >
                  {model.name}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
