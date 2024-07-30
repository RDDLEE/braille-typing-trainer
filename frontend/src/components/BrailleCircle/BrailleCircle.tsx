import React, { useCallback, useContext } from "react";
import { BrailleInputContext } from "../../contexts/BrailleInputContext";
import { EBraillePositions } from "../../lib/braille/BrailleDefs";
import HotkeyUtils from "../../lib/hotkeys/HotkeyUtils";
import StyleUtils from "../../lib/StyleUtils";
import { PreviewInputContext } from "../../contexts/PreviewInputContext";

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
  const previewInputContext = useContext(PreviewInputContext);

  const linkedPosition = props.linkedPosition;

  const getCircleFillColor = (): string => {
    if (brailleInputContext.activePositions.has(linkedPosition) || previewInputContext.positions.has(linkedPosition)) {
      return StyleUtils.ACTIVE_PAD_COLOR;
    } else {
      return StyleUtils.INACTIVE_PAD_COLOR;
    }
    // TODO: Half states. Activated but not active position states.
  };

  const getTextColor = (): string => {
    if (brailleInputContext.activePositions.has(linkedPosition) || previewInputContext.positions.has(linkedPosition)) {
      return StyleUtils.ACTIVE_PAD_TEXT_COLOR;
    } else {
      return StyleUtils.INACTIVE_PAD_TEXT_COLOR;
    }
  };

  const getText = useCallback((): string => {
    return HotkeyUtils.getHotkeyByPosition(linkedPosition);
  }, [linkedPosition]);

  // FIXME: Prevent default on touch.
  const onTouchStart_SVG = useCallback((_event: React.TouchEvent<SVGSVGElement>): void => {
    if (brailleInputContext.activatePosition !== undefined) {
      brailleInputContext.activatePosition(linkedPosition);
    }
  }, [brailleInputContext, linkedPosition]);

  const onTouchEnd_SVG = useCallback((_event: React.TouchEvent<SVGSVGElement>): void => {
    if (brailleInputContext.deactivatePosition !== undefined) {
      brailleInputContext.deactivatePosition(linkedPosition);
    }
  }, [brailleInputContext, linkedPosition]);

  return (
    <div>
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg"
        onTouchStart={onTouchStart_SVG} onTouchEnd={onTouchEnd_SVG} className="touch-none"
      >
        <circle cx={CIRCLE_X} cy={CIRCLE_Y} r="50" fill={getCircleFillColor()} stroke="black" strokeWidth="4" />
        <text x={TEXT_X} y={TEXT_Y} textAnchor="middle" fill={getTextColor()} fontSize="24" fontFamily="Arial" dominantBaseline="middle">
          {getText()}
        </text>
      </svg>
    </div>
  );
}