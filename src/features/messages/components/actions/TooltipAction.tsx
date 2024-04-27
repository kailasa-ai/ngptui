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

const TooltipAction = (props: Props) => {
  const { onClick, tooltipText, children } = props;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={800}>
        <TooltipTrigger asChild>
          <button
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
};

export default TooltipAction;
