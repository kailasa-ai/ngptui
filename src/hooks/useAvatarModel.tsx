import { useEffect, useState } from "react";

export const useAvatarModel = () => {
  const [model, setModel] = useState<string | null>(
    localStorage.getItem("model") ?? "nithyanandam"
  );

  useEffect(() => {
    if (!model) {
      localStorage.setItem("model", "nithyanandam");
      setModel("nithyanandam");
    }
  }, [model]);

  return model!;
};
