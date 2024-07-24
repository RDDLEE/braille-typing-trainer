import type { Meta, StoryObj } from "@storybook/react";
import BrailleContainer from "./BrailleContainer";

const meta = {
  title: "Braille/BrailleContainer",
  component: BrailleContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof BrailleContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    
  },
};