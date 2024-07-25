import React, { useContext } from "react";
import { Flex, Text } from "@mantine/core";
import { BrailleInputContext } from "@/contexts/BrailleInputContext";
import classes from "./LetterDisplay.module.css";
import BrailleUtils from "@/lib/braille/BrailleUtils";

export default function LetterDisplay() {
  const brailleInputContext = useContext(BrailleInputContext);

  const renderText = (): JSX.Element => {
    return (
      <Text key={brailleInputContext.lastCharacter.time} fw={700} fz={"4em"} className={classes["text-fade-out"]}>
        {renderCharacter()}
      </Text>
    );
  };

  const renderCharacter = (): string | null => {
    if (BrailleUtils.isDisplayableCharacter(brailleInputContext.lastCharacter.char)) {
      return brailleInputContext.lastCharacter.char;
    }
    return null;
  };

  return (
    <Flex w="100%" align="center" justify="center">
      {renderText()}
    </Flex>
  );
}
