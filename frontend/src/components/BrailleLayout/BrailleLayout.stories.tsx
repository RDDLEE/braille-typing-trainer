import type { Meta, StoryObj } from "@storybook/react";
import BrailleLayout from "./BrailleLayout";

const meta = {
  title: "Braille/BrailleLayout",
  component: BrailleLayout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof BrailleLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
};