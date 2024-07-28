import { useCallback, useContext } from "react";
import { BrailleInputContext } from "../../contexts/BrailleInputContext";
import { ETextControlCharacters } from "../../lib/braille/BrailleDefs";
import HotkeyUtils from "../../lib/hotkeys/HotkeyUtils";
import StyleUtils from "../../lib/StyleUtils";

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

  const linkedPosition = props.linkedPosition;

  const getRectFillColor = (): string => {
    if (brailleInputContext.activeTextControl.has(linkedPosition)) {
      return StyleUtils.ACTIVE_PAD_COLOR;
    } else {
      return StyleUtils.INACTIVE_PAD_COLOR;
    }
  };

  const getTextColor = (): string => {
    if (brailleInputContext.activeTextControl.has(linkedPosition)) {
      return StyleUtils.ACTIVE_PAD_TEXT_COLOR;
    } else {
      return StyleUtils.INACTIVE_PAD_TEXT_COLOR;
    }
  };

  const getText = useCallback((): string => {
    const key = HotkeyUtils.getHotkeyByPosition(linkedPosition);
    return HotkeyUtils.getDisplayableTextControlCharacter(key);
  }, [linkedPosition]);

  const onTouchStart_SVG = useCallback((): void => {
    if (brailleInputContext.activateTextControl !== undefined) {
      brailleInputContext.activateTextControl(linkedPosition);
    }
  }, [brailleInputContext, linkedPosition]);

  const onTouchEnd_SVG = useCallback((): void => {
    if (brailleInputContext.deactivateTextControl !== undefined) {
      brailleInputContext.deactivateTextControl(linkedPosition);
    }
  }, [brailleInputContext, linkedPosition]);

  // TODO: Make clickable for mobile.
  return (
    <div>
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg"
        onTouchStart={onTouchStart_SVG} onTouchEnd={onTouchEnd_SVG}
      >
        <rect x="0" width={RECT_WIDTH} height={RECT_HEIGHT} rx="5" ry="5" fill={getRectFillColor()} stroke="black" strokeWidth="5" />
        <text x={TEXT_X} y={TEXT_Y} textAnchor="middle" fill={getTextColor()} fontSize="12" fontWeight={700} fontFamily="Arial" dominantBaseline="middle">
          {getText()}
        </text>
      </svg>
    </div>
  );
}