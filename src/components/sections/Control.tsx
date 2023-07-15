import { FC, useState } from "react";
import Button from "../elements/Button";

const Control: FC = () => {
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
          className="fixed inset-0 z-50 bg-gradient-radial from-black/50 to-black"
        ></div>
      )}
    </>
  );
};

export default Control;
