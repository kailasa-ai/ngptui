import { Loader, ThumbsDown, ThumbsUp } from "lucide-react";

import TooltipAction from "./TooltipAction";

export enum FeedbackType {
  GOOD,
  BAD,
}

type Props = {
  onClick: () => void;
  type: FeedbackType;
  isActive?: boolean;
  isLoading?: boolean;
};

const FeedbackButton = (props: Props) => {
  return (
    <TooltipAction
      isActive={props.isActive}
      tooltipText={
        props.type === FeedbackType.GOOD ? "Good Response" : "Bad Response"
      }
      ariaLabel={
        props.type === FeedbackType.GOOD ? "Good Response" : "Bad Response"
      }
      onClick={props.onClick}
      disabled={props.isLoading}
    >
      {props.isLoading ? (
        <Loader size={18} />
      ) : props.type === FeedbackType.GOOD ? (
        <ThumbsUp size={18} />
      ) : (
        <ThumbsDown size={18} />
      )}
    </TooltipAction>
  );
};

export default FeedbackButton;
