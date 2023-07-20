import { FC, DragEvent, useState } from "react";
import { CardId, DropzoneProps } from "../../types";
import useStore from "../../hooks/useStore";

const Dropzone: FC<DropzoneProps> = ({ id }) => {
  const {
    state: { self, rival, dropzones },
    dispatch,
  } = useStore();
  const { name, values, status } = dropzones[id];
  const allowedCardIds = dropzones[id].allowedCardIds[status];
  const draggingCardId = self.deck[self.draggingCardIndex as number];
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCanDrop, setIsCanDrop] = useState(true);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (allowedCardIds.includes(draggingCardId)) {
      event.dataTransfer.dropEffect = "copy";
      setIsCanDrop(true);
    } else {
      event.dataTransfer.dropEffect = "none";
      setIsCanDrop(false);
    }

    dispatch({ type: "RIVAL_TARGET_DROPZONE", payload: id });
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    dispatch({ type: "RIVAL_TARGET_DROPZONE", payload: null });
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
      className={`flex-1 rounded-2xl border-4 p-4 backdrop-blur-3xl${
        isDragOver ? (isCanDrop ? " border-blue-500" : " border-red-500") : " border-white/10"
      }${rival.targetDropzoneId === id ? " border-rival" : ""}`}
    >
      <div className="font-bold text-white">
        <div>{name}</div>
        <div>Status: {status}</div>
        <div>Valid cards: {allowedCardIds.length > 0 ? allowedCardIds.join(", ") : "None"}</div>
      </div>
    </div>
  );
};

export default Dropzone;
