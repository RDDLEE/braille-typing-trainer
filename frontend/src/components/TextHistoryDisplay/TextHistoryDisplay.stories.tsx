import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TextHistoryDisplay from "./TextHistoryDisplay";
import { BrailleInputContext, BrailleInputContext_DEFAULT } from "../../contexts/BrailleInputContext";

const meta = {
  title: "Braille/TextHistoryDisplay",
  component: TextHistoryDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TextHistoryDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blank: Story = {
  args: {
    textHistory: "",
  },
};

export const NotBlank: Story = {
  args: {
    textHistory: "I am words.",
  },
};