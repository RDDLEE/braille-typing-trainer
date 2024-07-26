import { useContext, useEffect, useRef, useState } from "react";
import { BrailleInputContext } from "../../contexts/BrailleInputContext";
import { Box, Textarea } from "@mantine/core";

export default function TextHistoryDisplay() {
  const brailleInputContext = useContext(BrailleInputContext);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current !== null) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }    
  }, [brailleInputContext.lastCharacter.time]);

  return (
    <Box w={"100%"}>
      <Textarea
        variant="filled"
        size="md"
        radius="md"
        placeholder="Start typing..."
        value={brailleInputContext.textHistory}
        className="whitespace-break-spaces"
        disabled={true}
        maxRows={1}
        ref={textAreaRef}
      />
    </Box>
  );
}
