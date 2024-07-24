import { EBraillePositions } from "@/lib/braille/BrailleDefs";
import BrailleCircle from "../BrailleCircle/BrailleCircle";

export interface IBrailleLayout_Props {
  
}

export default function BrailleLayout(_props: IBrailleLayout_Props) {
  

  
  // TODO: Handle 6 and 8 dot.
  // TODO: Space and Backspace.
  return (
    <div className="flex flex-row w-full gap-x-60">
      <div className="flex flex-col">
        <BrailleCircle linkedPosition={EBraillePositions.L1} />
        <BrailleCircle linkedPosition={EBraillePositions.L2} />
        <BrailleCircle linkedPosition={EBraillePositions.L3} />
      </div>
      <div className="flex flex-col">
        <BrailleCircle linkedPosition={EBraillePositions.R1} />
        <BrailleCircle linkedPosition={EBraillePositions.R2} />
        <BrailleCircle linkedPosition={EBraillePositions.R3} />
      </div>
    </div>
  );
}