import { useCallback, useEffect, useReducer } from "react";
import { useWindowEvent } from "@mantine/hooks";
import { Box } from "@mantine/core";
import { produce } from "immer";
import { BrailleInputContext, BrailleInputContext_DEFAULT, IBrailleInputState } from "@/contexts/BrailleInputContext";
import { EBraillePositions } from "@/lib/braille/BrailleDefs";
import BrailleLayout from "../BrailleLayout/BrailleLayout";
import BrailleUtils from "@/lib/braille/BrailleUtils";

enum EBraileInputActions {
  ACTIVATE_POSITION = "activatePosition",
  DEACTIVATE_POSITION = "deactivatePosition",
  PERFORM_TEXT_CONTROL = "performTextControl",
}

interface IActivatePosition_Action {
  type: EBraileInputActions.ACTIVATE_POSITION;
  position: EBraillePositions;
}

interface IDeactivatePosition_Action {
  type: EBraileInputActions.DEACTIVATE_POSITION;
  position: EBraillePositions;
}

enum EControlCharacters {
  NONE = -1,
  SPACE = 1,
  BACKSPACE = 2,
}

interface IPerformTextControl_Action {
  type: EBraileInputActions.PERFORM_TEXT_CONTROL;
  control: EControlCharacters;
}

type BraileInputActions = IActivatePosition_Action | IDeactivatePosition_Action | IPerformTextControl_Action;

const brailleInputReducer = (state: IBrailleInputState, action: BraileInputActions): IBrailleInputState => {
  switch (action.type) {
    case EBraileInputActions.ACTIVATE_POSITION: {
      return produce<IBrailleInputState>(state,
        (draft): void => {
          draft.activePositions.add(action.position);
          draft.activatedPositions.add(action.position);
        }
      );
    } case EBraileInputActions.DEACTIVATE_POSITION: {
      // TODO: Need to check if all keys have been deactivated, then need to add final character.
      const newState = produce<IBrailleInputState>(state,
        (draft): void => {
          // NOTE: Do not remove position from activatedPositions.
          draft.activePositions.delete(action.position);
        }
      );
      if (newState.activePositions.size === 0) {
        // If there are no more active positions, we need to finalize input.
        return produce<IBrailleInputState>(newState,
          (draft): void => {
            const activatedPositionsSorted = Array.from(draft.activatedPositions).sort();
            if (activatedPositionsSorted.length === 0) {
              // If somehow a KeyUp event is called with no activated positions, just do nothing.
              return;
            }
            const newCharacter = BrailleUtils.convertPositionsToCharacter(activatedPositionsSorted);
            if (BrailleUtils.isDisplayableCharacter(newCharacter)) {
              draft.lastCharacter = {
                // TODO: Maybe with empty string for undisplayable characters.
                char: newCharacter,
                time: Date.now(),
              };
            }            
            draft.activatedPositions.clear();
            draft.activePositions.clear();
            if (BrailleUtils.isTextHistoryCharacter(newCharacter)) {
              draft.textHistory = draft.textHistory + newCharacter;
            }            
          }
        );
      } else {
        return newState;
      }
    } case EBraileInputActions.PERFORM_TEXT_CONTROL: {
      if (action.control === EControlCharacters.SPACE) {
        const newCharacter = " ";
        return produce<IBrailleInputState>(state,
          (draft): void => {
            draft.lastCharacter = {
              char: newCharacter,
              time: Date.now(),
            };
            // FIXME: If space is entered while keys are pressed, intended behavior is not yet planned.
            // Just allow spaces without resetting positions.
            if (BrailleUtils.isTextHistoryCharacter(newCharacter)) {
              draft.textHistory = draft.textHistory + newCharacter;
            }            
          }
        );
      } else if (action.control === EControlCharacters.BACKSPACE) {
        return produce<IBrailleInputState>(state,
          (draft): void => {
            draft.textHistory = draft.textHistory.slice(0, -1);
          }
        );
      } else {
        console.error("BrailleContainer.brailleInputReducer called and PERFORM_TEXT_CONTROL default.");
        return state;
      }
    } default: {
      console.error("BrailleContainer.brailleInputReducer called and defaulted.");
      return state;
    }
  }
};

export default function BrailleContainer() {
  const [brailleInputState, dispatchBraileInputState] = useReducer(brailleInputReducer, { ...BrailleInputContext_DEFAULT });

  const handleTextControlCharacters = (key: string): boolean => {
    let controlType: EControlCharacters = EControlCharacters.NONE;
    // FIXME: Make const.
    if (key === " ") {
      controlType = EControlCharacters.SPACE;
    } else if (key === "Backspace") {
      controlType = EControlCharacters.BACKSPACE;
    } else {
      return false;
    }
    dispatchBraileInputState({
      type: EBraileInputActions.PERFORM_TEXT_CONTROL,
      control: controlType,
    });
    return true;
  };
  
  const onKeyDown = useCallback((event: KeyboardEvent): void => {
    // TODO: Customizable hotkeys.
    const key = event.key;
    const wasControlCharacter = handleTextControlCharacters(key);
    if (wasControlCharacter) {
      return;
    }

    let positionToAdd = EBraillePositions.NONE;
    // FIXME: Make const.
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
      position: positionToAdd,
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
    // TODO: Customizable hotkeys.
    const key = event.key;
    let positionToRemove = EBraillePositions.NONE;
    // FIXME: Make const.
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
      position: positionToRemove,
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