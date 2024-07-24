export enum EBraillePositions {
  L1 = 1,
  L2 = 2,
  L3 = 3,
  L4 = 4,
  R1 = 5,
  R2 = 6,
  R3 = 7,
  R4 = 8,
}

export type BrailleCharMap = Map<string, EBraillePositions[]>;

export const CHARACTER_NOT_FOUND: string = "NOT_FOUND";
