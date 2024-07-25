import React from "react";
import type { Preview } from "@storybook/react";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import "../src/app/layout";
import { theme } from "../src/theme/theme";
import { enableMapSet } from "immer";
import { BrailleInputContext, BrailleInputContext_DEFAULT } from "../src/contexts/BrailleInputContext";

const preview: Preview = {
  decorators: [
    (Story, storyContext) => {
      enableMapSet();
      const braileInputContext = { ...BrailleInputContext_DEFAULT };
      const lastCharacter = storyContext.args["lastCharacter"];
      if (lastCharacter !== undefined) {
        braileInputContext.lastCharacter = lastCharacter;
      }
      const textHistory = storyContext.args["textHistory"];
      if (textHistory !== undefined) {
        braileInputContext.textHistory = textHistory;
      }
      return (
        <MantineProvider defaultColorScheme="light" theme={theme}>
          <BrailleInputContext.Provider value={braileInputContext}>
            <Story />
          </BrailleInputContext.Provider>
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
