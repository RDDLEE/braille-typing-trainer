import React from "react";
import type { Preview } from "@storybook/react";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import "../src/app/layout";
import { theme } from "../src/theme/theme";
import { enableMapSet } from "immer";

const preview: Preview = {
  decorators: [
    (Story, _storyContext) => {
      enableMapSet()
      return (
        <MantineProvider defaultColorScheme="light" theme={theme}>
          <Story />
        </MantineProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
