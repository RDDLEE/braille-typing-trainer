import { HotkeyKey, HotkeyMap, PositionMap, KeyboardPositions } from "./HotkeyDefs";

export default class HotkeyBimap {

  private readonly keyMap: HotkeyMap = new Map();

  private readonly positionMap: PositionMap = new Map();

  constructor(initKeyMap: HotkeyMap) {
    initKeyMap.forEach(
      (keyboardPosition: KeyboardPositions, hotkey: HotkeyKey): void => {
        this.keyMap.set(hotkey, keyboardPosition);
        this.positionMap.set(keyboardPosition, hotkey);
      }
    );
  }

  public readonly isKeyInHotkeyMap = (key: string): boolean => {
    if (this.keyMap.has(key)) {
      return true;
    }
    return false;
  };

  public readonly getHotkeyForKeyboardPosition = (position: KeyboardPositions): HotkeyKey => {
    const hotkey = this.positionMap.get(position);
    if (hotkey === undefined) {
      throw new Error(`Failed to find hotkey for position: ${position}.`);
    }
    return hotkey;
  };

  // TODO: Change hotkeys.

}
