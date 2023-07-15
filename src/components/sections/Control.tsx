import { FC, useState } from "react";
import Button from "../elements/Button";
import Element from "../elements/Element";
import { ElementId } from "../../types";

const Control: FC = () => {
  const [randomElements, setRandomElements] = useState<ElementId[]>([
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
    "E6",
  ]);
  const [isShowOverlay, setIsShowOverlay] = useState(false);

  const handleDraw = () => {
    console.log("Draw");
    setIsShowOverlay(true);
  };

  return (
    <>
      <div className="flex w-48 flex-col items-center justify-center border border-white/10 p-4 backdrop-blur-3xl">
        <Button action={handleDraw} name="joystick" size="SMALL">
          Draw
        </Button>
      </div>
      {isShowOverlay && (
        <div
          onClick={() => setIsShowOverlay(false)}
          className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-gradient-radial from-black/50 to-black"
        >
          <div className="flex gap-4">
            {randomElements.map((elementId, index) => (
              <Element
                key={`${elementId}-${index}`}
                id={elementId}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Control;
