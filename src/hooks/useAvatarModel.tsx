import { useEffect, useState } from "react";

export const useAvatarModel = () => {
  const [model, setModel] = useState<string | null>(
    localStorage.getItem("model") ?? "nithyanandam"
  );

  useEffect(() => {
    const handleChange = () => {
      setModel(localStorage.getItem("model"));
    };

    document.addEventListener("local-storage", handleChange);

    return () => {
      document.removeEventListener("local-storage", handleChange);
    };
  }, [model]);

  return model!;
};
