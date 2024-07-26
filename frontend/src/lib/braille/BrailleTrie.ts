import { CHARACTER_NOT_FOUND, EBraillePositions } from "./BrailleDefs";

export class BrailleTreeNode {
  private char: string | null;
  private readonly position: EBraillePositions;
  // NOTE: Recursive data structures are not handled well by ESLint.
  // eslint-disable-next-line no-use-before-define
  private readonly children: Map<EBraillePositions, BrailleTreeNode> = new Map();

  constructor(char: string | null, position: EBraillePositions) {
    this.char = char;
    this.position = position;
  }

  public readonly getChar = (): string | null => {
    return this.char;
  };

  public readonly setChar = (char: string | null): void => {
    this.char = char;
  };

  public readonly getPosition = (): EBraillePositions => {
    return this.position;
  };

  public readonly getChildren = (): Map<EBraillePositions, BrailleTreeNode> => {
    return this.children;
  };
}

export default class BrailleTrie {

  private readonly root: BrailleTreeNode;

  constructor(char: string | null, position: EBraillePositions) {
    this.root = new BrailleTreeNode(char, position);
  }

  public readonly getRoot = (): BrailleTreeNode => {
    return this.root;
  };
  
  public insert = (char: string, positions: EBraillePositions[]): void => {
    let curr = this.root;
    if (curr.getPosition() !== positions[0]) {
      throw new Error("Root position mismatch.");
    }
    for (let i = 1; i < positions.length; i++) {
      // Start looping from index 1, since index 0 will be the root.
      const position = positions[i];
      const currChildren = curr.getChildren();
      if (currChildren.has(position)) {
        curr = currChildren.get(position)!;
      } else {
        // If the current node doesn't have a child with that position, we need to add.
        const newNode = new BrailleTreeNode(null, position);
        currChildren.set(position, newNode);
        curr = newNode;
      }
    }
    // Set the final node's char. Not necessarily a leaf.
    const finalChar = curr.getChar();
    if (finalChar === null) {
      curr.setChar(char);
    } else {
      throw new Error(`Character overwrite. Character: ${char} attempting to overwrite ${finalChar}.`);
    }    
  };

  public convertPositionsToCharacter = (positions: EBraillePositions[]): string => {
    let curr = this.root;
    if (curr.getPosition() !== positions[0]) {
      throw new Error("Root position mismatch.");
    }
    for (let i = 1; i < positions.length; i++) {
      const position = positions[i];
      const currChildren = curr.getChildren();
      if (currChildren.has(position)) {
        curr = currChildren.get(position)!;
      } else {
        return CHARACTER_NOT_FOUND;
      }
    }
    const char = curr.getChar();
    if (char === null) {
      return CHARACTER_NOT_FOUND;
    }
    return char;
  };
}
