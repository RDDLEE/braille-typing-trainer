import { useCallback, useEffect, useReducer, useState } from "react";
import { useWindowEvent } from "@mantine/hooks";
import { Box } from "@mantine/core";
import { produce } from "immer";
import { BrailleInputContext, IBrailleInputContext, IBrailleInputState } from "@/contexts/BrailleInputContext";
import { EBraillePositions } from "@/lib/braille/BrailleDefs";
import BrailleLayout from "../BrailleLayout/BrailleLayout";

enum EBraileInputActions {
  ACTIVATE_POSITION = "activatePosition",
  DEACTIVATE_POSITION = "deactivatePosition",
}

interface IActivatePosition_Action {
  type: EBraileInputActions.ACTIVATE_POSITION;
  position: EBraillePositions;
}

interface IDeactivatePosition_Action {
  type: EBraileInputActions.DEACTIVATE_POSITION;
  position: EBraillePositions;
}

type BraileInputActions = IActivatePosition_Action | IDeactivatePosition_Action;

const brailleInputReducer = (state: IBrailleInputState, action: BraileInputActions): IBrailleInputState => {
  switch (action.type) {
    case EBraileInputActions.ACTIVATE_POSITION:
      return produce<IBrailleInputState>(state, 
        (draft): void => {
          draft.activePositions.add(action.position);
          draft.activatedPositions.add(action.position);
        }
      );
    case EBraileInputActions.DEACTIVATE_POSITION:
      // TODO: Need to check if all keys have been deactivated, then need to add final character.
      return produce<IBrailleInputState>(state, 
        (draft): void => {
          draft.activePositions.delete(action.position);
        }
      );
    default:
      // TODO: Handle.
      return state;
  } 
};

export default function BrailleContainer() {
  const [brailleInputState, dispatchBraileInputState] = useReducer(brailleInputReducer, {
    activatedPositions: new Set<EBraillePositions>(), 
    activePositions: new Set<EBraillePositions>(),
  });
  
  const onKeyDown = useCallback((event: KeyboardEvent): void => {
    // TODO: Customizable hotkeys.
    const key = event.key;
    let positionToAdd = EBraillePositions.NONE;
    if (key === "f") {
      positionToAdd = EBraillePositions.L1;
    } else if (key === "d") {
      positionToAdd = EBraillePositions.L2;
    } else if (key === "s") {
      positionToAdd = EBraillePositions.L3;
    } else if (key === "j") {
      positionToAdd = EBraillePositions.R1;
    } else if (key === "k") {
      positionToAdd = EBraillePositions.R2;
    } else if (key === "l") {
      positionToAdd = EBraillePositions.R3;
    } else {
      // TODO: Handle space and backspace.
      return;
    }

    dispatchBraileInputState({ 
      type: EBraileInputActions.ACTIVATE_POSITION, 
      position: positionToAdd 
    });
  }, []);

  const WINDOW_EVENT_KEYDOWN_NAME = "keydown";
  useWindowEvent(WINDOW_EVENT_KEYDOWN_NAME, onKeyDown);
  useEffect(() => {
    window.addEventListener(WINDOW_EVENT_KEYDOWN_NAME, onKeyDown);
    return () => {
      return window.removeEventListener(WINDOW_EVENT_KEYDOWN_NAME, onKeyDown);
    };
  }, [onKeyDown]);

  const onKeyUp = useCallback((event: KeyboardEvent): void => {
    console.log(`BrailleContainer.onKeyUp called and event: ${event.key}.`);
    // TODO: Customizable hotkeys.
    const key = event.key;
    let positionToRemove = EBraillePositions.NONE;
    if (key === "f") {
      positionToRemove = EBraillePositions.L1;
    } else if (key === "d") {
      positionToRemove = EBraillePositions.L2;
    } else if (key === "s") {
      positionToRemove = EBraillePositions.L3;
    } else if (key === "j") {
      positionToRemove = EBraillePositions.R1;
    } else if (key === "k") {
      positionToRemove = EBraillePositions.R2;
    } else if (key === "l") {
      positionToRemove = EBraillePositions.R3;
    } else {
      // TODO: Handle space and backspace.
      return;
    }

    dispatchBraileInputState({ 
      type: EBraileInputActions.DEACTIVATE_POSITION, 
      position: positionToRemove 
    });
  }, []);

  const WINDOW_EVENT_KEYUP_NAME = "keyup";
  useWindowEvent(WINDOW_EVENT_KEYUP_NAME, onKeyUp);
  useEffect(() => {
    window.addEventListener(WINDOW_EVENT_KEYUP_NAME, onKeyUp);
    return () => {
      return window.removeEventListener(WINDOW_EVENT_KEYUP_NAME, onKeyUp);
    };
  }, [onKeyUp]);

  return (
    <Box>
      <BrailleInputContext.Provider value={brailleInputState}>
        <BrailleLayout />
      </BrailleInputContext.Provider>
    </Box>
    
  );
}