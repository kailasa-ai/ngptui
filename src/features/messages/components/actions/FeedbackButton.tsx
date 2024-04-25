import { ThumbsDown, ThumbsUp } from "lucide-react";

import TooltipAction from "./TooltipAction";

export enum FeedbackType {
  GOOD,
  BAD,
}

type Props = {
  type: FeedbackType;
  onClick: () => void;
};

const FeedbackButton = (props: Props) => {
  return (
    <TooltipAction
      tooltipText={
        props.type === FeedbackType.GOOD ? "Good Response" : "Bad Response"
      }
      ariaLabel={
        props.type === FeedbackType.GOOD ? "Good Response" : "Bad Response"
      }
      onClick={props.onClick}
    >
      {props.type === FeedbackType.GOOD ? (
        <ThumbsUp size={18} />
      ) : (
        <ThumbsDown size={18} />
      )}
    </TooltipAction>
  );
};

export default FeedbackButton;
