import { useState } from "react";
import Card from "../components/elements/Card";
import Dropzone from "../components/elements/Dropzone";
import useStore from "../hooks/useStore";
import { CardId, DropzoneId } from "../types";
import Button from "../components/elements/Button";

const Game = () => {
  const {
    state: { self, dropzones },
  } = useStore();
  const dropzoneIds = Object.keys(dropzones) as DropzoneId[];
  const [draggingCard, setDraggingCard] = useState<CardId | null>(null);

  const handleDraw = () => {
    console.log("Draw");
  };

  return (
    <div className="flex gap-4">
      <div className="grid flex-1 grid-rows-[1fr_2fr_1fr] gap-4">
        <div className="flex border border-white/10"></div>
        <div className="grid grid-cols-4 gap-4 border border-white/10 p-4">
          {dropzoneIds.map((dropzoneId) => (
            <Dropzone
              key={dropzoneId}
              id={dropzoneId}
              draggingCard={draggingCard}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 border border-white/10 p-4">
          {self.deck.map((cardId) => (
            <Card
              key={cardId}
              id={cardId}
              onDragStart={(cardId) => setDraggingCard(cardId)}
            />
          ))}
        </div>
      </div>
      <div className="flex w-48 flex-col items-center justify-center border border-white/10 backdrop-blur-3xl">
        <Button action={handleDraw} name="joystick" size="SMALL">
          Draw
        </Button>
      </div>
    </div>
  );
};

export default Game;
