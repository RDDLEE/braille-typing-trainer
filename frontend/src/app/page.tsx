"use client";

import BrailleContainer from "../components/BrailleContainer/BrailleContainer";
import BrailleUtils from "../lib/braille/BrailleUtils";
import { Button, Card, Flex, List, Text, Title } from "@mantine/core";
import { enableMapSet } from "immer";

enableMapSet();

export default function HomePage() {

  const renderBrailleAlphabet = (): JSX.Element => {
    const elements: JSX.Element[] = [];
    BrailleUtils.US_SIX_DOT_LETTER_BRAILE_MAP.forEach(
      (braille: string, letter: string): void => {
        elements.push((
          <Card bg={"blue.3"} pb={0} pt={"xs"} pl={"xs"} pr={"xs"} key={letter}>
            <Flex
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
            >
              <Text fw={500}>
                {letter}
              </Text>
              <Text fz={"4em"} lh={"1em"}>
                {braille}
              </Text>
            </Flex>
          </Card>
        ));
      }
    );
    return (
      <Flex
        gap="xs"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        mt={"xl"}
        w="50%"
      >
        {elements}
      </Flex>
    );
  };

  const renderQuickNotesSection = (): JSX.Element => {
    return (
      <Flex
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Title order={2} className={"text-center"} mt={"xl"} mb={"xl"}>
          Quick Notes
        </Title>
        <List withPadding={true} type={"unordered"} listStyleType="disc">
          <List.Item>
            The Braille Typing Trainer does not currently support mobile.
          </List.Item>
          <List.Item>
            The native iOS braille keyboard relies on gestures to input characters like spaces, backspaces, and returns.
          </List.Item>
          <List.Item>
            For the Braille Typing Trainer, use the Spacebar for spaces and the Backspace key for deletions.
          </List.Item>
          <List.Item>
            The Braille Typing Trainer does not support gestures.
          </List.Item>
          <List.Item>
            The Braille Typing Trainer does not currently support numbers.
          </List.Item>
        </List>
      </Flex>
    );
  };

  const renderAboutSection = (): JSX.Element => {
    return (
      <Flex
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Title order={2} className={"text-center"} mt={"xl"} mb={"xl"}>
          About
        </Title>
        <Text maw={"50%"} ta={"center"}>
          Braille Typing Trainer is a free web-based application designed to help users practice braille keyboard typing conveniently from their browser.
          Whether you're a beginner learning braille or an advanced user looking to enhance your typing speed and accuracy, our platform offers a comprehensive and accessible solution.
        </Text>
      </Flex>
    );
  };

  return (
    <div>
      <Title order={1} className={"text-center"} mt={"xl"} mb={"xl"}>
        Braille Typing Trainer
      </Title>
      <Flex justify="center" align="center" direction="column">
        <BrailleContainer />
        {renderBrailleAlphabet()}
        {renderQuickNotesSection()}
        {renderAboutSection()}
      </Flex>
    </div>
  );
}
