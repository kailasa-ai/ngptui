import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";

type Props = {
  onClick: () => void;
  tooltipText: string;
  children: React.ReactNode;
  ariaLabel: string;
};

const TooltipAction = (props: Props) => {
  const { onClick, tooltipText, children } = props;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={800}>
        <TooltipTrigger>
          <button
            className="rounded-md p-1 text-xs text-gray-400 hover:text-gray-900"
            aria-label={props.ariaLabel}
            onClick={onClick}
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
