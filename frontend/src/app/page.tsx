import { Flex, Text, Title } from "@mantine/core";
import BrailleAppContainer from "../components/BrailleAppContainer/BrailleAppContainer";
import React from "react";

interface ITextSection {
  title: string;
  bodyLines: string[];
}

const TEXT_SECTIONS: ITextSection[] = [
  {
    title: "Quick Notes",
    bodyLines: [
      "The native iOS braille keyboard relies on gestures to input characters like spaces, backspaces, and returns.",
      "For the Braille Typing Trainer, use the Spacebar for spaces and the Backspace key for deletions.",
      "The Braille Typing Trainer does not support gestures.",
      "The Braille Typing Trainer only currently supports lowercase letters.",
    ],
  },
  {
    title: "About",
    bodyLines: [
      "Braille Typing Trainer is a free web-based application designed to help users practice braille keyboard typing conveniently from their browser.",
      "Whether you're a beginner learning braille or an advanced user looking to enhance your typing speed and accuracy, Braille Typing Trainer offers an accessible solution.",
    ],
  },
  {
    title: "Why Learn Braille Typing If I'm Not Visually Impaired?",
    bodyLines: [
      "Even if you are not visually impaired, learning to type in braille (and visionless device navigation) will allow you to fully use your device without vision.",
      "In particular, the ability to use your mobile device while walking without having to look down.",
      "For individuals who do a lot of walking, being able to move and use a device safely can lead to greater productivity and an improved quality of life.",
    ],
  },
];

export default function HomePage() {

  const renderTextSection = (section: ITextSection): JSX.Element => {
    return (
      <Flex
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        key={section.title}
      >
        <Title order={2} className="text-center" mt="xl" mb="xl">
          {section.title}
        </Title>
        <Text ta="center">
          {
            section.bodyLines.map((line: string, index: number): JSX.Element => {
              let lineBreak: JSX.Element | null = <br />;
              if (index === section.bodyLines.length - 1) {
                lineBreak = null;
              }
              return (
                <React.Fragment key={index}>
                  {line}
                  {lineBreak}
                </React.Fragment>
              );
            })
          }
        </Text>
      </Flex>
    );
  };

  const renderTextSections = (): JSX.Element => {
    const elements: JSX.Element[] = [];
    TEXT_SECTIONS.forEach(
      (section: ITextSection): void => {
        elements.push(renderTextSection(section));
      }
    );
    return (
      <React.Fragment>
        {elements}
      </React.Fragment>
    );
  };

  return (
    <div>
      <Title order={1} className={"text-center"} mt={"xl"} mb={"xl"}>
        Braille Typing Trainer
      </Title>
      <Flex justify="center" align="center" direction="column" mb={"xl"}>
        <BrailleAppContainer />
        {renderTextSections()}
      </Flex>
    </div>
  );
}
