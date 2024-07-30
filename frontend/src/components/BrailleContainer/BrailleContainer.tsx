"use client";

import { useCallback, useEffect, useReducer } from "react";
import { useWindowEvent } from "@mantine/hooks";
import { Box, Flex } from "@mantine/core";
import { produce } from "immer";
import { BrailleInputContext, BrailleInputContext_DEFAULT, IBrailleInputState } from "../../contexts/BrailleInputContext";
import { EBraillePositions, ETextControlCharacters } from "../../lib/braille/BrailleDefs";
import BrailleLayout from "../BrailleLayout/BrailleLayout";
import BrailleUtils from "../../lib/braille/BrailleUtils";
import HotkeyUtils from "../../lib/hotkeys/HotkeyUtils";
import AlphabetCard from "../AlphabetCard/AlphabetCard";

enum EBraileInputActions {
  ACTIVATE_POSITION = "activatePosition",
  DEACTIVATE_POSITION = "deactivatePosition",
  ACTIVATE_TEXT_CONTROL = "activateTextControl",
  DEACTIVATE_TEXT_CONTROL = "deactivateTextControl",
}

interface IActivatePosition_Action {
  type: EBraileInputActions.ACTIVATE_POSITION;
  position: EBraillePositions;
}

interface IDeactivatePosition_Action {
  type: EBraileInputActions.DEACTIVATE_POSITION;
  position: EBraillePositions;
}

interface IActivateTextControl_Action {
  type: EBraileInputActions.ACTIVATE_TEXT_CONTROL;
  control: ETextControlCharacters;
}

interface IDeactivateTextControl_Action {
  type: EBraileInputActions.DEACTIVATE_TEXT_CONTROL;
  control: ETextControlCharacters;
}

type BraileInputActions = IActivatePosition_Action | IDeactivatePosition_Action | IActivateTextControl_Action | IDeactivateTextControl_Action;

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
    } case EBraileInputActions.ACTIVATE_TEXT_CONTROL: {
      return produce<IBrailleInputState>(state,
        (draft): void => {
          draft.activeTextControl.add(action.control);
        }
      );
    } case EBraileInputActions.DEACTIVATE_TEXT_CONTROL: {
      if (action.control === ETextControlCharacters.SPACE) {
        const newCharacter = " ";
        return produce<IBrailleInputState>(state,
          (draft): void => {
            draft.lastCharacter = {
              char: newCharacter,
              time: Date.now(),
            };
            if (BrailleUtils.isTextHistoryCharacter(newCharacter)) {
              draft.textHistory = draft.textHistory + newCharacter;
            }
            draft.activeTextControl.delete(ETextControlCharacters.SPACE);
          }
        );
      } else if (action.control === ETextControlCharacters.BACKSPACE) {
        return produce<IBrailleInputState>(state,
          (draft): void => {
            draft.textHistory = draft.textHistory.slice(0, -1);
            draft.activeTextControl.delete(ETextControlCharacters.BACKSPACE);
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

  const activatePosition = useCallback((position: EBraillePositions): void => {
    if (brailleInputState.activePositions.has(position)) {
      // If position already active.
      return;
    }
    dispatchBraileInputState({
      type: EBraileInputActions.ACTIVATE_POSITION,
      position: position,
    });
  }, [brailleInputState.activePositions]);

  const deactivatePosition = useCallback((position: EBraillePositions): void => {
    dispatchBraileInputState({
      type: EBraileInputActions.DEACTIVATE_POSITION,
      position: position,
    });
  }, []);

  const activateTextControl = useCallback((textControl: ETextControlCharacters): void => {
    dispatchBraileInputState({
      type: EBraileInputActions.ACTIVATE_TEXT_CONTROL,
      control: textControl,
    });
  }, []);

  const deactivateTextControl = useCallback((textControl: ETextControlCharacters): void => {
    dispatchBraileInputState({
      type: EBraileInputActions.DEACTIVATE_TEXT_CONTROL,
      control: textControl,
    });
  }, []);

  const onKeyDown_TextControl = useCallback((key: string): boolean => {
    let controlChar: ETextControlCharacters = ETextControlCharacters.NONE;
    if (key === HotkeyUtils.getHotkeyByPosition(ETextControlCharacters.SPACE)) {
      controlChar = ETextControlCharacters.SPACE;
    } else if (key === HotkeyUtils.getHotkeyByPosition(ETextControlCharacters.BACKSPACE)) {
      controlChar = ETextControlCharacters.BACKSPACE;
    } else {
      return false;
    }
    activateTextControl(controlChar);
    return true;
  }, [activateTextControl]);

  const onKeyDown = useCallback((event: KeyboardEvent): void => {
    // TODO: Customizable hotkeys.
    const key = event.key;
    if (HotkeyUtils.isKeyInHotkeyMap(key)) {
      event.stopPropagation();
      event.preventDefault();
    }
    const wasControlCharacter = onKeyDown_TextControl(key);
    if (wasControlCharacter) {
      return;
    }
    let positionToAdd = EBraillePositions.NONE;
    // NOTE: Could do this programmatically.
    // TODO: Need to add L4/R4 for 8 Dot.
    if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.L1)) {
      positionToAdd = EBraillePositions.L1;
    } else if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.L2)) {
      positionToAdd = EBraillePositions.L2;
    } else if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.L3)) {
      positionToAdd = EBraillePositions.L3;
    } else if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.R1)) {
      positionToAdd = EBraillePositions.R1;
    } else if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.R2)) {
      positionToAdd = EBraillePositions.R2;
    } else if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.R3)) {
      positionToAdd = EBraillePositions.R3;
    } else {
      return;
    }
    activatePosition(positionToAdd);
  }, [onKeyDown_TextControl, activatePosition]);

  const WINDOW_EVENT_KEYDOWN_NAME = "keydown";
  useWindowEvent(WINDOW_EVENT_KEYDOWN_NAME, onKeyDown);
  useEffect(() => {
    window.addEventListener(WINDOW_EVENT_KEYDOWN_NAME, onKeyDown);
    return () => {
      return window.removeEventListener(WINDOW_EVENT_KEYDOWN_NAME, onKeyDown);
    };
  }, [onKeyDown]);

  const onKeyUp_TextControl = useCallback((key: string): boolean => {
    let controlChar: ETextControlCharacters = ETextControlCharacters.NONE;
    if (key === HotkeyUtils.getHotkeyByPosition(ETextControlCharacters.SPACE)) {
      controlChar = ETextControlCharacters.SPACE;
    } else if (key === HotkeyUtils.getHotkeyByPosition(ETextControlCharacters.BACKSPACE)) {
      controlChar = ETextControlCharacters.BACKSPACE;
    } else {
      return false;
    }
    deactivateTextControl(controlChar);
    return true;
  }, [deactivateTextControl]);

  const onKeyUp = useCallback((event: KeyboardEvent): void => {
    const key = event.key;
    if (HotkeyUtils.isKeyInHotkeyMap(key)) {
      event.stopPropagation();
      event.preventDefault();
    }
    const wasControlCharacter = onKeyUp_TextControl(key);
    if (wasControlCharacter) {
      return;
    }
    let positionToRemove = EBraillePositions.NONE;
    if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.L1)) {
      positionToRemove = EBraillePositions.L1;
    } else if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.L2)) {
      positionToRemove = EBraillePositions.L2;
    } else if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.L3)) {
      positionToRemove = EBraillePositions.L3;
    } else if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.R1)) {
      positionToRemove = EBraillePositions.R1;
    } else if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.R2)) {
      positionToRemove = EBraillePositions.R2;
    } else if (key === HotkeyUtils.getHotkeyByPosition(EBraillePositions.R3)) {
      positionToRemove = EBraillePositions.R3;
    } else {
      return;
    }
    deactivatePosition(positionToRemove);
  }, [onKeyUp_TextControl, deactivatePosition]);

  const WINDOW_EVENT_KEYUP_NAME = "keyup";
  useWindowEvent(WINDOW_EVENT_KEYUP_NAME, onKeyUp);
  useEffect(() => {
    window.addEventListener(WINDOW_EVENT_KEYUP_NAME, onKeyUp);
    return () => {
      return window.removeEventListener(WINDOW_EVENT_KEYUP_NAME, onKeyUp);
    };
  }, [onKeyUp]);

  return (
    <Box w="100%">
      <BrailleInputContext.Provider value={{
        ...brailleInputState,
        activatePosition: activatePosition,
        deactivatePosition: deactivatePosition,
        activateTextControl: activateTextControl,
        deactivateTextControl: deactivateTextControl,
      }}>
        <BrailleLayout />
      </BrailleInputContext.Provider>
    </Box>

  );
}