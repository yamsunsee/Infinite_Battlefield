import { FC, DragEvent, useState } from "react";
import { CardId, DropzoneProps } from "../../types";
import useStore from "../../hooks/useStore";

const Dropzone: FC<DropzoneProps> = ({ id }) => {
  const {
    state: { draggingCard, dropzones },
    dispatch,
  } = useStore();
  const { name, values, status } = dropzones[id];
  const allowedCardIds = dropzones[id].allowedCardIds[status];
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

    const string = event.dataTransfer.getData("text/plain");
    const { cardId, cardIndex } = JSON.parse(string) as {
      cardId: CardId;
      cardIndex: number;
    };

    if (allowedCardIds.includes(cardId)) {
      const newStatus = values[cardId] as number;
      dispatch({
        type: "UPGRADE_DROPZONE",
        payload: { dropzoneId: id, status: newStatus },
      });
      dispatch({ type: "SELF_DECK", payload: cardIndex });
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
        <div>Status: {status}</div>
      </div>
    </div>
  );
};

export default Dropzone;
