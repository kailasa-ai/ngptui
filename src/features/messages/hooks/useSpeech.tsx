import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useSpeechSynthesis = () => {
  const synth = window.speechSynthesis;
  const [spechState, setSpeechState] = useState<"SPEAKING" | "PAUSED" | "IDLE">(
    "IDLE"
  );

  const [selectedVoice] = useState(() => {
    const voices = synth.getVoices();
    return voices.find((voice) => voice.name === "Lekha") ?? voices[0];
  });

  useEffect(() => {
    return () => {
      synth.cancel();
    };
  }, [synth]);

  const speak = (text: string) => {
    try {
      const utterThis = new SpeechSynthesisUtterance(text);

      utterThis.onend = function (event) {
        setSpeechState("IDLE");
      };

      utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror", event);
        setSpeechState("IDLE");
      };

      utterThis.addEventListener("pause", () => {
        setSpeechState("PAUSED");
      });

      utterThis.voice = selectedVoice!;

      synth.speak(utterThis);
      setSpeechState("SPEAKING");
    } catch (e) {
      toast.error("Sorry, I can't speak right now.", {
        duration: 2000,
        style: {
          backgroundColor: "#f64545",
          color: "#fff",
        },
      });
      setSpeechState("IDLE");
    }
  };

  return {
    speak,
    pause: synth.pause,
    resume: synth.resume,
    cancel: synth.cancel,
    synth,
    spechState,
  };
};
