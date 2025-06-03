import { useState } from "react";

export const useAnswerSelection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const select = (index: number) => {
    setSelectedIndex(index);
  };

  const reset = () => {
    setSelectedIndex(null);
  };

  return { selectedIndex, select, reset };
};
