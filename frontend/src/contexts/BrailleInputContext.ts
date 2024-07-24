import { EBraillePositions } from "@/lib/braille/BrailleDefs";
import { createContext } from "react";

export interface IBrailleInputState { 
  activatedPositions: Set<EBraillePositions>; 
  activePositions: Set<EBraillePositions>;
  // TODO: Characters produced.
  // TODO: Hotkeys.
}

export interface IBrailleInputContext extends IBrailleInputState{
  
}

export const BrailleInputContext_DEFAULT: IBrailleInputContext = {
  activatedPositions: new Set(),
  activePositions: new Set(),
};

export const BrailleInputContext = createContext<IBrailleInputContext>(BrailleInputContext_DEFAULT);