import { FC, DragEvent, useState, useMemo } from "react";
import useStore from "../../hooks/useStore";
import { CardId, CardProps } from "../../types";
import Icon from "./Icon";

const Card: FC<CardProps> = ({ id, index, type = "DEFAULT" }) => {
  const {
    state: { cards },
    dispatch,
  } = useStore();
  const card = cards[id as CardId];
  const [isDragging, setIsDragging] = useState(false);

  const styles = useMemo(() => {
    switch (type) {
      case "SELF":
        return `card_container self${isDragging ? " opacity-0" : ""}`;

      case "RIVAL":
        return `card_container rival flipped`;

      default:
        return "card_container";
    }
  }, [type, isDragging]);

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
    <div className={styles}>
      <div draggable={type === "SELF"} onDragStart={handleDragStart} onDragEnd={handleDragEnd} className="frontside">
        <div>{card.name}</div>
        <div>{card.price}</div>
      </div>
      <div className="backside">
        <Icon name="question_mark" size="LARGE" />
      </div>
    </div>
  );
};

export default Card;
