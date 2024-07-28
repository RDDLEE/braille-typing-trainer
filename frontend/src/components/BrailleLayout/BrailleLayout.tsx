import { EBraillePositions, ETextControlCharacters } from "../../lib/braille/BrailleDefs";
import BrailleCircle from "../BrailleCircle/BrailleCircle";
import LetterDisplay from "../LetterDisplay/LetterDisplay";
import { Box, Flex, SegmentedControl } from "@mantine/core";
import React, { useCallback, useState } from "react";
import TextHistoryDisplay from "../TextHistoryDisplay/TextHistoryDisplay";
import BrailleRect from "../BrailleRect/BrailleRect";
import { useViewportSize } from "@mantine/hooks";
import classes from "./BrailleLayout.module.css";

enum EBraileLayoutOrientation {
  PORTRAIT = "portrait",
  LANDSCAPE = "landscape",
}

interface IOrientationDataItem {
  label: string;
  value: EBraileLayoutOrientation;
}

const ORIENTATION_DATA: IOrientationDataItem[] = [
  {
    label: "Portrait",
    value: EBraileLayoutOrientation.PORTRAIT,
  },
  {
    label: "Landscape",
    value: EBraileLayoutOrientation.LANDSCAPE,
  },
];

export default function BrailleLayout() {

  const viewportSize = useViewportSize();

  const [orientation, setOrientation] = useState<EBraileLayoutOrientation>(EBraileLayoutOrientation.PORTRAIT);

  const onChange_OrientationSelection = useCallback((value: string) => {
    if (value === EBraileLayoutOrientation.PORTRAIT) {
      setOrientation(EBraileLayoutOrientation.PORTRAIT);
    } else if (value === EBraileLayoutOrientation.LANDSCAPE) {
      setOrientation(EBraileLayoutOrientation.LANDSCAPE);
    } else {
      console.error(`BrailleLayout.onChange_OrientationSelection called and failed to map value: ${value}.`);
    }
  }, []);

  const getPadJustify = (): "center" | "space-between" => {
    if (orientation === EBraileLayoutOrientation.PORTRAIT) {
      return "center";
    }
    return "space-between";
  };

  const getRectWidth = (): number => {
    const rectWidth = Math.max(0, Math.min(250, Math.floor((viewportSize.width - 40) / 2)));
    return rectWidth;
  };

  // TODO: Handle 6 and 8 dot.
  return (
    <Flex w="100%" align="center" direction="column">
      <Box className={classes["layout-header"]}>
        <SegmentedControl fullWidth={true} color="rgba(0, 0, 0, 1)" data={ORIENTATION_DATA}
          value={orientation} onChange={onChange_OrientationSelection} mb="md"
        />
        <Flex justify="center" align="center" direction="row">
          <TextHistoryDisplay />
        </Flex>
      </Box>

      <Flex gap="xl" justify={getPadJustify()} align="center" direction="row" ml="xl" mr="xl" w="100%">
        <Flex direction="column">
          <BrailleCircle linkedPosition={EBraillePositions.L1} />
          <BrailleCircle linkedPosition={EBraillePositions.L2} />
          <BrailleCircle linkedPosition={EBraillePositions.L3} />
        </Flex>
        <Flex w="5em" justify="center" align="center">
          <LetterDisplay />
        </Flex>
        <Flex direction="column">
          <BrailleCircle linkedPosition={EBraillePositions.R1} />
          <BrailleCircle linkedPosition={EBraillePositions.R2} />
          <BrailleCircle linkedPosition={EBraillePositions.R3} />
        </Flex>
      </Flex>
      <Flex justify={getPadJustify()} align="center" direction="row" gap="10px"  ml="xl" mr="xl" w="100%">
        <BrailleRect linkedPosition={ETextControlCharacters.SPACE} width={getRectWidth()} height={50} />
        <BrailleRect linkedPosition={ETextControlCharacters.BACKSPACE} width={getRectWidth()} height={50} />
      </Flex>
    </Flex>
  );
}