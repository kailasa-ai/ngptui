import React from "react";

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";

import { cn } from "@/lib/utils";

type Props = {
  tooltipText: string;
  children: React.ReactNode;
  ariaLabel: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
};

const TooltipAction = React.forwardRef<HTMLButtonElement, Props>(
  (props: Props, ref) => {
    const { onClick, tooltipText, children } = props;

    return (
      <TooltipProvider>
        <Tooltip delayDuration={800}>
          <TooltipTrigger asChild>
            <button
              ref={ref}
              className={cn(
                "rounded-md p-1 text-xs text-gray-400 hover:text-gray-900",
                props.isActive && "text-gray-900"
              )}
              aria-label={props.ariaLabel}
              onClick={onClick}
              disabled={props.disabled}
            >
              {children}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <TooltipArrow />
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

TooltipAction.displayName = "TooltipAction";

export default TooltipAction;
