import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LetterDisplay from "./LetterDisplay";
import { BrailleInputContext, BrailleInputContext_DEFAULT, IBrailleLastCharacterInput } from "../../contexts/BrailleInputContext";

const meta = {
  title: "Braille/LetterDisplay",
  component: LetterDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof LetterDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lastCharacter: {
      char: "a",
      time: 0,
    },
  },
};