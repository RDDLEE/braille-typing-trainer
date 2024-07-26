import { useCallback, useContext } from "react";
import { BrailleInputContext } from "@/contexts/BrailleInputContext";
import { EBraillePositions } from "@/lib/braille/BrailleDefs";
import BrailleUtils from "@/lib/braille/BrailleUtils";
import HotkeyUtils from "@/lib/hotkeys/HotkeyUtils";

export interface IBrailleCircle_Props {
  linkedPosition: EBraillePositions;
}

export default function BrailleCircle(props: IBrailleCircle_Props) {
  const brailleInputContext = useContext(BrailleInputContext);

  const getCircleFillColor = (): string => {
    if (brailleInputContext.activePositions.has(props.linkedPosition)) {
      return "black";
    } else {
      return "white";
    }
    // TODO: Half states. Activated but not active position states.
  };

  const getTextColor = (): string => {
    if (brailleInputContext.activePositions.has(props.linkedPosition)) {
      return "white";
    } else {
      return "black";
    }
  };

  const getText = useCallback((): string => {
    return HotkeyUtils.getHotkeyByPosition(props.linkedPosition);
  }, [props.linkedPosition]);

  // TODO: Make clickable for mobile.
  return (
    <div>
      <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill={getCircleFillColor()} stroke="black" stroke-width="4" />
        <text x="60" y="60" text-anchor="middle" fill={getTextColor()} font-size="24" font-family="Arial" dominant-baseline="middle">
          {getText()}
        </text>
      </svg>
    </div>
  );
}