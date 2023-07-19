import { FC, useEffect, useState } from "react";
import { ElementId } from "../../types";
import Button from "../elements/Button";
import Slot from "../elements/Slot";
import Element from "../elements/Element";
import useStore from "../../hooks/useStore";
import Card from "../elements/Card";

const Control: FC = () => {
  const {
    state: { elements },
  } = useStore();
  const [slots, setSlots] = useState<ElementId[][]>([]);
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [isReroll, setIsReroll] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<{ level: number; element: ElementId }>({ level: 0, element: "E0" });

  useEffect(() => {
    if (!isReroll && !isShowOverlay) return;
    const base: ElementId[] = ["E1", "E2", "E3", "E4", "E5", "E6"];
    const newSlots = Array.from({ length: 3 }, () => {
      let shuffledBase = [...base, ...base, ...base];
      do {
        shuffledBase = shuffledBase.sort(() => Math.random() - 0.5);
      } while (isInvalidSlot(shuffledBase));
      return shuffledBase;
    });
    setSlots(newSlots);
    setIsReroll(false);
  }, [isReroll, isShowOverlay]);

  useEffect(() => {
    if (!isCompleted) return;
    const lastElements = slots.map((slot) => slot[slot.length - 1]);
    const score = Array.from(new Set(lastElements));

    let results: { level: number; element: ElementId } = {
      level: 0,
      element: "E0",
    };
    switch (score.length) {
      case 1:
        results = { level: 2, element: score[0] };
        break;

      case 2:
        const [first, second, third] = lastElements;
        if (first === second || first === third) results = { level: 1, element: first };
        else results = { level: 1, element: second };
        break;

      default:
        break;
    }

    setResults(results);
  }, [isCompleted]);

  const isInvalidSlot = (slot: ElementId[]) => {
    for (let i = 0; i < slot.length; i++) {
      if (slot[i] === slot[i + 1]) return true;
    }
    return false;
  };

  const handleDraw = () => {
    setIsShowOverlay(true);
    setIsCompleted(false);
    setResults({ level: 0, element: "E0" });
  };

  const handleReroll = () => {
    setIsReroll(true);
    setIsCompleted(false);
    setResults({ level: 0, element: "E0" });
  };

  return (
    <>
      <div className="flex w-48 flex-col items-center justify-center rounded-3xl border border-white/10 p-4 backdrop-blur-3xl">
        <Button action={handleDraw} name="joystick" size="SMALL">
          Draw
        </Button>
      </div>
      {isShowOverlay && (
        <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-gradient-radial from-black/50 to-black">
          <div className="flex flex-col gap-4 rounded-3xl border-4 border-white/10 p-20 backdrop-blur-3xl">
            <div className="flex">
              {slots.map((slot, index) => (
                <Slot
                  key={index}
                  elements={slot}
                  order={index}
                  isReroll={isReroll}
                  completed={() => setIsCompleted(true)}
                />
              ))}
            </div>
            <div className="flex justify-center gap-4 rounded-3xl border-4 border-white/10 p-4">
              <Element id={results.element} />
              {results.level === 2 && <Element id="E0" />}
            </div>
            <div className="flex h-48 items-center justify-center gap-4 rounded-3xl border-4 border-white/10 p-4">
              {elements[results.element].deck.map((cardId, index) => (
                <Card key={`${cardId}-${index}`} id={cardId} />
              ))}
            </div>
            <div className="flex justify-around gap-4">
              <Button name="close" action={() => setIsShowOverlay(false)} disabled={!isCompleted}>
                Close
              </Button>
              <Button name="restart_alt" action={handleReroll} disabled={!isCompleted}>
                Reroll
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Control;
