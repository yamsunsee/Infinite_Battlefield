import { FC, DragEvent, useState } from "react";
import useStore from "../../hooks/useStore";
import { CardId, CardProps } from "../../types";

const Card: FC<CardProps> = ({ id, index, isDraggable = true }) => {
  const {
    state: { cards },
    dispatch,
  } = useStore();
  const card = cards[id as CardId];
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    const string = JSON.stringify({ cardId: id, cardIndex: index });

    event.dataTransfer.setData("text/plain", string);
    dispatch({ type: "DRAGGING_CARD", payload: id });
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`-ml-8 flex h-full max-h-40 w-32 flex-col items-center justify-center gap-4 rounded-2xl border-4 border-white/10 p-4 text-white backdrop-blur-3xl transition-all hover:z-10 hover:-translate-y-2 hover:border-theme${
        isDragging ? " cursor-grabbing opacity-0" : ""
      }${isDraggable ? " cursor-grab" : " cursor-not-allowed"}`}
    >
      <div>{card.name}</div>
      <div>{card.price}</div>
    </div>
  );
};

export default Card;
