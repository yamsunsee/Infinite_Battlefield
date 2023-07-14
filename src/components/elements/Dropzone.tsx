import { FC, DragEvent, useState } from "react";
import { CardId, DropzoneProps } from "../../types";
import useStore from "../../hooks/useStore";

const Dropzone: FC<DropzoneProps> = ({ id, draggingCard }) => {
  const {
    state: { cards, dropzones },
    dispatch,
  } = useStore();
  const { name, level } = dropzones[id];
  const allowedCardIds = dropzones[id].allowedCardIds[level];
  const [values, setValues] = useState<CardId[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCanDrop, setIsCanDrop] = useState(true);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (allowedCardIds.includes(draggingCard as CardId)) {
      event.dataTransfer.dropEffect = "copy";
      setIsCanDrop(true);
    } else {
      event.dataTransfer.dropEffect = "none";
      setIsCanDrop(false);
    }
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text/plain") as CardId;

    if (allowedCardIds.includes(cardId)) {
      setValues([...values, cardId]);
      dispatch({ type: "SELF_DECK", payload: cardId });
    }
    setIsDragOver(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex-1 rounded-2xl border-4 p-4 border-dashed${
        isDragOver
          ? isCanDrop
            ? " border-blue-500"
            : " border-red-500"
          : " border-white/10"
      }`}
    >
      <div className="font-bold text-white">
        <div>{name}</div>
        <div>Level: {level}</div>
        <div>{values.map((cardId) => cards[cardId].name).join(", ")}</div>
      </div>
    </div>
  );
};

export default Dropzone;
