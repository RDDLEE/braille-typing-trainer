import { EBraillePositions } from "@/lib/braille/BrailleDefs";
import { createContext } from "react";

export interface IBrailleLastCharacterInput {
  char: string | null;
  time: number;
}

export const BRAILE_LAST_CHARACTER_INPUT_DEFAULT: IBrailleLastCharacterInput = {
  char: null,
  time: -1,
};

export type HotkeyKey = string;
export type PositionHotkeyMap = Map<EBraillePositions, HotkeyKey>;

export interface IBrailleInputState {
  activatedPositions: Set<EBraillePositions>;
  activePositions: Set<EBraillePositions>;
  lastCharacter: IBrailleLastCharacterInput;
  textHistory: string;
  // hotkeys: PositionHotkeyMap;
  // TODO: Hotkeys.
}

export interface IBrailleInputContext extends IBrailleInputState { }

export const BrailleInputContext_DEFAULT: IBrailleInputContext = {
  activatedPositions: new Set(),
  activePositions: new Set(),
  lastCharacter: BRAILE_LAST_CHARACTER_INPUT_DEFAULT,
  textHistory: "",
};

export const BrailleInputContext = createContext<IBrailleInputContext>(BrailleInputContext_DEFAULT);