"use client";

import React, { useCallback, useState } from "react";
import BrailleContainer from "../BrailleContainer/BrailleContainer";
import BrailleUtils from "../../lib/braille/BrailleUtils";
import AlphabetCard from "../AlphabetCard/AlphabetCard";
import { Flex } from "@mantine/core";
import { PreviewInputContext } from "../../contexts/PreviewInputContext";
import { EBraillePositions } from "../../lib/braille/BrailleDefs";
import { enableMapSet } from "immer";

console.log("Welcome to Braille Typing Trainer (v0.0.1).");
enableMapSet();

export default function BrailleAppContainer() {
  const [previewPositions, setPreviewPositions] = useState<Set<EBraillePositions>>(new Set());

  // TODO: Add fullscreen support for BrailleContainer.

  const onMouseEnter_AlphabetCard = useCallback((char: string): void => {
    const positions = BrailleUtils.getPositionsOfCharacter(char);
    setPreviewPositions(new Set(positions));
  }, []);

  const onMouseLeave_AlphabetCard = useCallback((): void => {
    setPreviewPositions(new Set());
  }, []);

  const renderAlphabetCards = (): JSX.Element => {
    const elements: JSX.Element[] = [];
    BrailleUtils.US_SIX_DOT_LETTER_BRAILE_MAP.forEach(
      (braille: string, character: string): void => {
        elements.push((
          <AlphabetCard
            character={character} braille={braille} key={character}
            onMouseEnter_AlphabetCard={onMouseEnter_AlphabetCard}
            onMouseLeave_AlphabetCard={onMouseLeave_AlphabetCard}
          />
        ));
      }
    );
    return (
      <Flex gap="xs" justify="center" align="center" direction="row" wrap="wrap" mt={"xl"} w="100%">
        {elements}
      </Flex>
    );
  };

  return (
    <React.Fragment>
      <PreviewInputContext.Provider value={{ positions: previewPositions }}>
        <BrailleContainer />
      </PreviewInputContext.Provider>
      {renderAlphabetCards()}
    </React.Fragment>
  );
}
