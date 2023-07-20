import { FC } from "react";
import useStore from "../../hooks/useStore";
import Card from "../elements/Card";
import Line from "../elements/Line";

const Rival: FC = () => {
  const {
    state: { rival },
  } = useStore();

  return (
    <div className="z-10 flex items-center justify-center rounded-t-3xl border border-white/10 p-4 pl-12">
      {rival.deck.map((cardId, index) => (
        <Card key={`${cardId}-${index}`} id={cardId} index={index} type="RIVAL" />
      ))}
      <Line coordinates={[0, 0, 100, 100]} />
    </div>
  );
};

export default Rival;
