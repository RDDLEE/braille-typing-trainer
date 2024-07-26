import type { Meta, StoryObj } from "@storybook/react";
import BrailleCircle from "./BrailleCircle";
import { EBraillePositions } from "../../lib/braille/BrailleDefs";

const meta = {
  title: "Braille/BrailleCircle",
  component: BrailleCircle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof BrailleCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    linkedPosition: EBraillePositions.L1
  },
};