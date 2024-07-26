import { useCallback, useContext } from "react";
import { BrailleInputContext } from "@/contexts/BrailleInputContext";
import { ETextControlCharacters } from "@/lib/braille/BrailleDefs";
import HotkeyUtils from "@/lib/hotkeys/HotkeyUtils";

export interface IBrailleRect_Props {
  linkedPosition: ETextControlCharacters;
  width: number;
  height: number;
}

export default function BrailleRect(props: IBrailleRect_Props) {
  const brailleInputContext = useContext(BrailleInputContext);

  const SVG_WIDTH = props.width;
  const SVG_HEIGHT = props.height;

  const RECT_WIDTH = SVG_WIDTH;
  const RECT_HEIGHT = SVG_HEIGHT;

  const TEXT_X = RECT_WIDTH / 2;
  const TEXT_Y = RECT_HEIGHT / 2;

  const getRectFillColor = (): string => {
    if (brailleInputContext.activeTextControl.has(props.linkedPosition)) {
      return "black";
    } else {
      return "white";
    }
  };

  const getTextColor = (): string => {
    if (brailleInputContext.activeTextControl.has(props.linkedPosition)) {
      return "white";
    } else {
      return "black";
    }
  };

  const getText = useCallback((): string => {
    const key = HotkeyUtils.getHotkeyByPosition(props.linkedPosition);
    return HotkeyUtils.getDisplayableTextControlCharacter(key);
  }, [props.linkedPosition]);

  // TODO: Make clickable for mobile.
  return (
    <div>
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
        <rect x="0" width={RECT_WIDTH} height={RECT_HEIGHT} rx="5" ry="5" fill={getRectFillColor()} stroke="black" stroke-width="5" />
        <text x={TEXT_X} y={TEXT_Y} text-anchor="middle" fill={getTextColor()} font-size="12" fontWeight={700} font-family="Arial" dominant-baseline="middle">
          {getText()}
        </text>
      </svg>
    </div>
  );
}