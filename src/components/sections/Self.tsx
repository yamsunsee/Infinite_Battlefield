import { FC } from "react";
import useStore from "../../hooks/useStore";
import Card from "../elements/Card";

const Self: FC = () => {
  const {
    state: { self },
  } = useStore();

  return (
    <div className="flex items-center justify-center overflow-y-auto border border-white/10 p-4 pl-12">
      {self.deck.map((cardId) => (
        <Card key={cardId} id={cardId} />
      ))}
    </div>
  );
};

export default Self;
