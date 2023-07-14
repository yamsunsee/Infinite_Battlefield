import { FC, DragEvent, useState, useEffect } from "react";
import { CardId, CardProps } from "../../types";
import useStore from "../../hooks/useStore";

const Card: FC<CardProps> = ({ id, onDragStart, isDraggable = true }) => {
  const {
    state: { socket, form, cards },
  } = useStore();
  const card = cards[id as CardId];
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", id);
    onDragStart(id);
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
      className={`flex h-full max-h-40 w-32 flex-col items-center justify-center gap-4 rounded-2xl border-4 border-white/10 p-4 text-white backdrop-blur-3xl transition-all hover:border-theme hover:-translate-y-2${
        isDragging ? " cursor-grabbing opacity-0" : ""
      }${isDraggable ? " cursor-grab" : " cursor-not-allowed"}`}
    >
      <div>{card.name}</div>
      <div>{card.price}</div>
    </div>
  );
};

export default Card;
