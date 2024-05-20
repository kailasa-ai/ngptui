import { Button } from "@/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/dialog";
import { Input } from "@/components/input";
import { useState } from "react";

type Props = {
  name: string;
  onCancel: () => void;
  onRename: (name: string) => void;
};

const RenameDialog = (props: Props) => {
  const [name, setName] = useState(props.name);

  return (
    <Dialog defaultOpen={true} onOpenChange={props.onCancel}>
      <DialogContent className="pt-12 max-w-md">
        <DialogTitle>Rename Chat</DialogTitle>
        <Input
          type="text"
          placeholder="Conversation Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus={true}
        />
        <DialogFooter className="pt-10">
          <DialogClose asChild={true}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild={true}>
            <Button
              disabled={!name || name === props.name}
              onClick={props.onRename.bind(null, name)}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
