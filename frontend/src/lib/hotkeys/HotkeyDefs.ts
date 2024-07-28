import { EBraillePositions, ETextControlCharacters } from "../braille/BrailleDefs";

export type HotkeyKey = string;

export type KeyboardPositions = EBraillePositions | ETextControlCharacters;

export type HotkeyMap = Map<HotkeyKey, KeyboardPositions>;

export type PositionMap = Map<KeyboardPositions, HotkeyKey>;

export const HOTKEY_L1_KEY_DEFAULT: string = "f";
export const HOTKEY_L2_KEY_DEFAULT: string = "d";
export const HOTKEY_L3_KEY_DEFAULT: string = "s";
export const HOTKEY_L4_KEY_DEFAULT: string = "a";

export const HOTKEY_R1_KEY_DEFAULT: string = "j";
export const HOTKEY_R2_KEY_DEFAULT: string = "k";
export const HOTKEY_R3_KEY_DEFAULT: string = "l";
export const HOTKEY_R4_KEY_DEFAULT: string = "p";

export const HOTKEY_SPACE_KEY_DEFAULT: string = " ";
export const HOTKEY_BACKSPACE_KEY_DEFAULT: string = "Backspace";

