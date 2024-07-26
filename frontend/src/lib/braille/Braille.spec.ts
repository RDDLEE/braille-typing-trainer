import { describe, expect, test } from "vitest";
import { CHARACTER_NOT_FOUND, EBraillePositions } from "./BrailleDefs";
import BrailleTrie, { BrailleTreeNode } from "./BrailleTrie";
import BrailleUtils from "./BrailleUtils";

describe("BrailleTrieNode", () => {
  test("BrailleTreeNode init", () => {
    const brailleTrie = new BrailleTreeNode("a", EBraillePositions.L1);
    expect(brailleTrie.getChar()).to.equal("a");
    expect(brailleTrie.getPosition()).to.equal(EBraillePositions.L1);
    expect(brailleTrie.getChildren.length).to.equal(0);
  });
});

describe("BrailleTrie", () => {
  test("BrailleTrie init", () => {
    const brailleTrie = new BrailleTrie("a", EBraillePositions.L1);
    expect(brailleTrie.getRoot().getChar()).to.equal("a");
    expect(brailleTrie.getRoot().getPosition()).to.equal(EBraillePositions.L1);
  });

  test("BrailleTrie.convertPositionsToCharacter", () => {
    const brailleTrie = new BrailleTrie("a", EBraillePositions.L1);
    expect(brailleTrie.convertPositionsToCharacter([EBraillePositions.L1])).to.equal("a");
  });

  test("BrailleTrie.insert", () => {
    const brailleTrie = new BrailleTrie("a", EBraillePositions.L1);
    brailleTrie.insert("b", [EBraillePositions.L1, EBraillePositions.L2]);
    expect(brailleTrie.convertPositionsToCharacter([EBraillePositions.L1, EBraillePositions.L2])).to.equal("b");
    expect(brailleTrie.convertPositionsToCharacter([EBraillePositions.L1, EBraillePositions.L3])).to.equal(CHARACTER_NOT_FOUND);
    expect(() => {
      brailleTrie.convertPositionsToCharacter([EBraillePositions.L2]);
    }).toThrowError();
  });
});

describe("BrailleUtils", () => {
  test("BrailleUtils.convertPositionsToCharacter - US SIXDOT CHARSET", () => {
    const charMap = BrailleUtils.getUsSixDotBaseCharMap();
    charMap.forEach(
      (positions: EBraillePositions[], char: string): void => {
        expect(BrailleUtils.convertPositionsToCharacter(positions)).to.equal(char);
      }
    );
  });
});