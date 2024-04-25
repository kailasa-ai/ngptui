import { useEffect, useState } from "react";
import { Clipboard, Check } from "lucide-react";

import TooltipAction from "./TooltipAction";

import { copyToClipboard } from "@/lib/utils";

const CopyToClipBoard = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied]);

  const handleCopy = () => {
    if (isCopied) {
      return;
    }

    copyToClipboard(text);
    setIsCopied(true);
  };

  return (
    <TooltipAction
      tooltipText="Copy to Clipboard"
      ariaLabel="Copy message to clipboard"
      onClick={handleCopy}
    >
      {isCopied ? <Check size={18} /> : <Clipboard size={18} />}
    </TooltipAction>
  );
};

export default CopyToClipBoard;
