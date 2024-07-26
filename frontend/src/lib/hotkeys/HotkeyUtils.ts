import { EBraillePositions, ETextControlCharacters } from "../braille/BrailleDefs";
import HotkeyBimap from "./HotkeyBimap";
import {
  HotkeyMap, HOTKEY_L1_KEY_DEFAULT, HOTKEY_L2_KEY_DEFAULT, HOTKEY_L3_KEY_DEFAULT,
  HOTKEY_L4_KEY_DEFAULT, HOTKEY_R1_KEY_DEFAULT, HOTKEY_R2_KEY_DEFAULT, HOTKEY_R3_KEY_DEFAULT,
  HOTKEY_R4_KEY_DEFAULT, HOTKEY_SPACE_KEY_DEFAULT, HOTKEY_BACKSPACE_KEY_DEFAULT,
  HotkeyKey,
  KeyboardPositions
} from "./HotkeyDefs";

export default class HotkeyUtils {

  private static readonly getDefaultHotkeyMap = (): HotkeyMap => {
    const hotkeyMap: HotkeyMap = new Map();
    {
      hotkeyMap.set(HOTKEY_L1_KEY_DEFAULT, EBraillePositions.L1);
      hotkeyMap.set(HOTKEY_L2_KEY_DEFAULT, EBraillePositions.L2);
      hotkeyMap.set(HOTKEY_L3_KEY_DEFAULT, EBraillePositions.L3);
      hotkeyMap.set(HOTKEY_L4_KEY_DEFAULT, EBraillePositions.L4);

      hotkeyMap.set(HOTKEY_R1_KEY_DEFAULT, EBraillePositions.R1);
      hotkeyMap.set(HOTKEY_R2_KEY_DEFAULT, EBraillePositions.R2);
      hotkeyMap.set(HOTKEY_R3_KEY_DEFAULT, EBraillePositions.R3);
      hotkeyMap.set(HOTKEY_R4_KEY_DEFAULT, EBraillePositions.R4);

      hotkeyMap.set(HOTKEY_SPACE_KEY_DEFAULT, ETextControlCharacters.SPACE);
      hotkeyMap.set(HOTKEY_BACKSPACE_KEY_DEFAULT, ETextControlCharacters.BACKSPACE);
    }
    return hotkeyMap;
  };
  
  // TODO: Move hotkeys to BrailleInputContext to support customization.
  private static readonly hotkeys = new HotkeyBimap(HotkeyUtils.getDefaultHotkeyMap());

  public static readonly getHotkeyByPosition = (position: KeyboardPositions): HotkeyKey => {
    return HotkeyUtils.hotkeys.getHotkeyForKeyboardPosition(position);
  };

  public static readonly isKeyInHotkeyMap = (key: string): boolean => {
    return HotkeyUtils.hotkeys.isKeyInHotkeyMap(key);
  };

  public static readonly getDisplayableTextControlCharacter = (char: string): string => {
    if (char === HOTKEY_SPACE_KEY_DEFAULT) {
      return "(Space)";
    } else if (char === HOTKEY_BACKSPACE_KEY_DEFAULT) {
      return "(Backspace)";
    }
    throw new Error(`HotkeyUtils.getDisplayableTextControlCharacter and failed to map char: ${char}.`);
  };

}