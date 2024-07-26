import { BrailleCharMap, CHARACTER_NOT_FOUND, EBraillePositions, LetterToBraileMap } from "./BrailleDefs";
import BrailleTrie from "./BrailleTrie";

export default class BrailleUtils {
  public static readonly US_SIX_DOT_LETTER_BRAILE_MAP: LetterToBraileMap = new Map([
    ["a", "⠁"],
    ["b", "⠃"],
    ["c", "⠉"],
    ["d", "⠙"],
    ["e", "⠑"],
    ["f", "⠋"],
    ["g", "⠛"],
    ["h", "⠓"],
    ["i", "⠊"],
    ["j", "⠚"],
    ["k", "⠅"],
    ["l", "⠇"],
    ["m", "⠍"],
    ["n", "⠝"],
    ["o", "⠕"],
    ["p", "⠏"],
    ["q", "⠟"],
    ["r", "⠗"],
    ["s", "⠎"],
    ["t", "⠞"],
    ["u", "⠥"],
    ["v", "⠧"],
    ["w", "⠺"],
    ["x", "⠭"],
    ["y", "⠽"],
    ["z", "⠵"],
  ]);

  private static readonly US_SIXDOT_BASE_CHARMAP: BrailleCharMap = new Map([
    ["a", [EBraillePositions.L1]],
    ["b", [EBraillePositions.L1, EBraillePositions.L2]],
    ["c", [EBraillePositions.L1, EBraillePositions.R1]],
    ["d", [EBraillePositions.L1, EBraillePositions.R1, EBraillePositions.R2]],
    ["e", [EBraillePositions.L1, EBraillePositions.R2]],
    ["f", [EBraillePositions.L1, EBraillePositions.L2, EBraillePositions.R1]],
    ["g", [EBraillePositions.L1, EBraillePositions.L2, EBraillePositions.R1, EBraillePositions.R2]],
    ["h", [EBraillePositions.L1, EBraillePositions.L2, EBraillePositions.R2]],
    ["i", [EBraillePositions.L2, EBraillePositions.R1]],
    ["j", [EBraillePositions.L2, EBraillePositions.R1, EBraillePositions.R2]],
    ["k", [EBraillePositions.L1, EBraillePositions.L3]],
    ["l", [EBraillePositions.L1, EBraillePositions.L2, EBraillePositions.L3]],
    ["m", [EBraillePositions.L1, EBraillePositions.L3, EBraillePositions.R1]],
    ["n", [EBraillePositions.L1, EBraillePositions.L3, EBraillePositions.R1, EBraillePositions.R2]],
    ["o", [EBraillePositions.L1, EBraillePositions.L3, EBraillePositions.R2]],
    ["p", [EBraillePositions.L1, EBraillePositions.L2, EBraillePositions.L3, EBraillePositions.R1]],
    ["q", [EBraillePositions.L1, EBraillePositions.L2, EBraillePositions.L3, EBraillePositions.R1, EBraillePositions.R2]],
    ["r", [EBraillePositions.L1, EBraillePositions.L2, EBraillePositions.L3, EBraillePositions.R2]],
    ["s", [EBraillePositions.L2, EBraillePositions.L3, EBraillePositions.R1]],
    ["t", [EBraillePositions.L2, EBraillePositions.L3, EBraillePositions.R1, EBraillePositions.R2]],
    ["u", [EBraillePositions.L1, EBraillePositions.L3, EBraillePositions.R3]],
    ["v", [EBraillePositions.L1, EBraillePositions.L2, EBraillePositions.L3, EBraillePositions.R3]],
    ["w", [EBraillePositions.L2, EBraillePositions.R1, EBraillePositions.R2, EBraillePositions.R3]],
    ["x", [EBraillePositions.L1, EBraillePositions.L3, EBraillePositions.R1, EBraillePositions.R3]],
    ["y", [EBraillePositions.L1, EBraillePositions.L3, EBraillePositions.R1, EBraillePositions.R2, EBraillePositions.R3]],
    ["z", [EBraillePositions.L1, EBraillePositions.L3, EBraillePositions.R2, EBraillePositions.R3]],
  ]);

  public static readonly getUsSixDotBaseCharMap = (): BrailleCharMap => {
    return BrailleUtils.US_SIXDOT_BASE_CHARMAP;
  };

  private static readonly createBaseTries = (): Map<EBraillePositions, BrailleTrie> => {
    return new Map([
      [EBraillePositions.L1, new BrailleTrie(null, EBraillePositions.L1)],
      [EBraillePositions.L2, new BrailleTrie(null, EBraillePositions.L2)],
      [EBraillePositions.L3, new BrailleTrie(null, EBraillePositions.L3)],
      [EBraillePositions.L4, new BrailleTrie(null, EBraillePositions.L4)],
      [EBraillePositions.R1, new BrailleTrie(null, EBraillePositions.R1)],
      [EBraillePositions.R2, new BrailleTrie(null, EBraillePositions.R2)],
      [EBraillePositions.R3, new BrailleTrie(null, EBraillePositions.R3)],
      [EBraillePositions.R4, new BrailleTrie(null, EBraillePositions.R4)],
    ]);
  };

  private static readonly initUsSixDotBaseTries = (): Map<EBraillePositions, BrailleTrie> => {
    const baseTries = BrailleUtils.createBaseTries();
    BrailleUtils.US_SIXDOT_BASE_CHARMAP.forEach(
      (positions: EBraillePositions[], char: string) => {
        const basePosition = positions[0];
        if (baseTries.has(basePosition) === false) {
          throw new Error(`Unable to find trie for base position: ${basePosition}.`);
        }
        const trie = baseTries.get(basePosition)!;
        trie.insert(char, positions);
      }
    );
    return baseTries;
  };

  private static readonly US_SIXDOT_BASE_TRIES: Map<EBraillePositions, BrailleTrie> = BrailleUtils.initUsSixDotBaseTries();

  // TODO: Should take in a language, keyboard, dotsize, modifier mode.
  public static readonly convertPositionsToCharacter = (positions: EBraillePositions[]): string => {
    const basePosition = positions[0];
    if (BrailleUtils.US_SIXDOT_BASE_TRIES.has(basePosition) === false) {
      throw new Error(`Failed to find trie with base position ${basePosition}.`);
    }
    const trie = BrailleUtils.US_SIXDOT_BASE_TRIES.get(basePosition)!;
    return trie.convertPositionsToCharacter(positions);
  };

  public static readonly isDisplayableCharacter = (char: string | null): boolean => {
    if (char === null) {
      return false;
    }
    if (char === CHARACTER_NOT_FOUND) {
      return false;
    }
    return true;
  };

  public static readonly isTextHistoryCharacter = (char: string | null): boolean => {
    if (char === null) {
      return false;
    }
    if (char === CHARACTER_NOT_FOUND) {
      return false;
    }
    return true;
  };

}
