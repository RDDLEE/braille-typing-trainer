import type { Meta, StoryObj } from "@storybook/react";
import BrailleRect from "./BrailleRect";
import { ETextControlCharacters } from "../../lib/braille/BrailleDefs";


const meta = {
  title: "Braille/BrailleRect",
  component: BrailleRect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof BrailleRect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Space: Story = {
  args: {
    linkedPosition: ETextControlCharacters.SPACE
  },
};

export const Backspace: Story = {
  args: {
    linkedPosition: ETextControlCharacters.BACKSPACE
  },
};