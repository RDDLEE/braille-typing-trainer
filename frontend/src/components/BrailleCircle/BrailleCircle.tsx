import { useCallback, useContext } from "react";
import { BrailleInputContext } from "../../contexts/BrailleInputContext";
import { EBraillePositions } from "../../lib/braille/BrailleDefs";
import HotkeyUtils from "../../lib/hotkeys/HotkeyUtils";

export interface IBrailleCircle_Props {
  linkedPosition: EBraillePositions;
}

const SVG_WIDTH = 120;
const SVG_HEIGHT = 120;

const CIRCLE_X = SVG_WIDTH / 2;
const CIRCLE_Y = SVG_HEIGHT / 2;

const TEXT_X = CIRCLE_X;
const TEXT_Y = CIRCLE_Y;

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
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
        <circle cx={CIRCLE_X} cy={CIRCLE_Y} r="50" fill={getCircleFillColor()} stroke="black" strokeWidth="4" />
        <text x={TEXT_X} y={TEXT_Y} textAnchor="middle" fill={getTextColor()} fontSize="24" fontFamily="Arial" dominantBaseline="middle">
          {getText()}
        </text>
      </svg>
    </div>
  );
}