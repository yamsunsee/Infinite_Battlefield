import { FC } from "react";
import useStore from "../../hooks/useStore";
import Card from "../elements/Card";

const Rival: FC = () => {
  const {
    state: { rival },
  } = useStore();

  return (
    <div className="flex items-center justify-center overflow-y-auto border border-white/10 p-4 pl-12">
      {rival.deck.map((cardId, index) => (
        <Card
          key={`${cardId}-${index}`}
          id={cardId}
          index={index}
          isDraggable={false}
        />
      ))}
    </div>
  );
};

export default Rival;
