import { EBraillePositions, ETextControlCharacters } from "../../lib/braille/BrailleDefs";
import BrailleCircle from "../BrailleCircle/BrailleCircle";
import LetterDisplay from "../LetterDisplay/LetterDisplay";
import { Flex } from "@mantine/core";
import React from "react";
import TextHistoryDisplay from "../TextHistoryDisplay/TextHistoryDisplay";
import BrailleRect from "../BrailleRect/BrailleRect";

export interface IBrailleLayout_Props {

}

export default function BrailleLayout(_props: IBrailleLayout_Props) {
  // TODO: Handle 6 and 8 dot.
  // TODO: Space and Backspace.
  return (
    <Flex w={"500px"} direction="column">
      <Flex justify="center" align="center" direction="row">
        <TextHistoryDisplay />
      </Flex>
      <Flex gap="xl" justify="center" align="center" direction="row">
        <Flex direction="column">
          <BrailleCircle linkedPosition={EBraillePositions.L1} />
          <BrailleCircle linkedPosition={EBraillePositions.L2} />
          <BrailleCircle linkedPosition={EBraillePositions.L3} />
        </Flex>
        <Flex w="10rem" justify="center" align="center">
          <LetterDisplay />
        </Flex>
        <Flex direction="column">
          <BrailleCircle linkedPosition={EBraillePositions.R1} />
          <BrailleCircle linkedPosition={EBraillePositions.R2} />
          <BrailleCircle linkedPosition={EBraillePositions.R3} />
        </Flex>
      </Flex>
      <Flex justify="center" align="center" direction="row" gap="xl">
        <BrailleRect linkedPosition={ETextControlCharacters.SPACE} width={250} height={50} />
        <BrailleRect linkedPosition={ETextControlCharacters.BACKSPACE} width={250} height={50} />
      </Flex>
    </Flex>
  );
}