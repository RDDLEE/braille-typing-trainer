import { useContext } from "react";
import { BrailleInputContext } from "@/contexts/BrailleInputContext";
import { Text } from "@mantine/core";

export default function TextHistoryDisplay() {
  const brailleInputContext = useContext(BrailleInputContext);

  console.log(`TextHistoryDisplay ${brailleInputContext.textHistory}`);

  return (
    <Text size="xl">{brailleInputContext.textHistory}</Text>
  );

}