import { createContext } from "react";
import { EBraillePositions, ETextControlCharacters } from "../lib/braille/BrailleDefs";

export interface IBrailleLastCharacterInput {
  char: string | null;
  time: number;
}

export const BRAILE_LAST_CHARACTER_INPUT_DEFAULT: IBrailleLastCharacterInput = {
  char: null,
  time: -1,
};

export interface IBrailleInputState {
  activatedPositions: Set<EBraillePositions>;
  activePositions: Set<EBraillePositions>;
  activeTextControl: Set<ETextControlCharacters>;
  lastCharacter: IBrailleLastCharacterInput;
  textHistory: string;
}

export interface IBrailleInputContext extends IBrailleInputState { 
  activatePosition?: (position: EBraillePositions) => void;
  deactivatePosition?: (position: EBraillePositions) => void;
  activateTextControl?: (textControl: ETextControlCharacters) => void;
  deactivateTextControl?: (textControl: ETextControlCharacters) => void;
}

export const BrailleInputContext_DEFAULT: IBrailleInputContext = {
  activatedPositions: new Set(),
  activePositions: new Set(),
  activeTextControl: new Set(),
  lastCharacter: BRAILE_LAST_CHARACTER_INPUT_DEFAULT,
  textHistory: "",
};

export const BrailleInputContext = createContext<IBrailleInputContext>(BrailleInputContext_DEFAULT);