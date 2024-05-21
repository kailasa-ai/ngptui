import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from "@/components/dropdown-menu";

import { useAvatarModel } from "@/hooks/useAvatarModel";

import { models } from "../models";

const ModelsDropdown = () => {
  const avatarModel = useAvatarModel();
  // const params = useParams<{ id?: string }>();
  const currentModel = models.find((model) => model.id === avatarModel);
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        // disabled={!!params.id}
        className="flex items-center gap-2 group outline-none"
      >
        <h2 className="text-lg font-medium">{currentModel?.name}</h2>
        {/* {!params.id && ( */}
        <ChevronDown
          size={18}
          className="group-data-[state=open]:-rotate-180 transition-transform duration-200"
        />
        {/* // )} */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-normal">
        <DropdownMenuLabel className="font-normal text-xs text-gray-500">
          Model
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={avatarModel}
          onValueChange={(value) => {
            router.replace("/");

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
  );
};

export default ModelsDropdown;
