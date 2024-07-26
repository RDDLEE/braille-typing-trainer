export enum EBraillePositions {
  NONE = -1,
  L1 = 1,
  L2 = 2,
  L3 = 3,
  L4 = 4,
  R1 = 5,
  R2 = 6,
  R3 = 7,
  R4 = 8,
}

export enum ETextControlCharacters {
  NONE = -1,
  SPACE = 9,
  BACKSPACE = 10,
}

export type BrailleCharMap = Map<string, EBraillePositions[]>;

export const CHARACTER_NOT_FOUND: string = "NOT_FOUND";
