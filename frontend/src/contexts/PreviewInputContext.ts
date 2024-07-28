import { createContext } from "react";
import { EBraillePositions } from "../lib/braille/BrailleDefs";

export interface IPreviewInputContext {
  positions: Set<EBraillePositions>;
}

export const PreviewInputContext_DEFAULT: IPreviewInputContext = {
  positions: new Set(),
};

export const PreviewInputContext = createContext<IPreviewInputContext>(PreviewInputContext_DEFAULT);