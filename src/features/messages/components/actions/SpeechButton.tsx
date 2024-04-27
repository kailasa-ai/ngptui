import { Pause, Play, Volume2 } from "lucide-react";

import TooltipAction from "./TooltipAction";

import { useSpeechSynthesis } from "../../hooks/useSpeech";

type Props = {
  text: string;
};

const SpeechButton = (props: Props) => {
  const { speak, spechState, synth } = useSpeechSynthesis();

  const handleSpeech = () => {
    if (spechState === "SPEAKING") {
      synth.pause();
      return;
    }

    if (spechState === "PAUSED") {
      synth.resume();
      return;
    }

    speak(props.text);
  };

  let icon = <Volume2 size={18} />;

  if (spechState === "SPEAKING") {
    icon = <Pause size={18} />;
  }

  if (spechState === "PAUSED") {
    icon = <Play size={18} />;
  }

  return (
    <TooltipAction
      tooltipText="Read Aloud"
      ariaLabel="Read message aloud"
      onClick={handleSpeech}
      isActive={spechState !== "IDLE"}
    >
      {icon}
    </TooltipAction>
  );
};

export default SpeechButton;
