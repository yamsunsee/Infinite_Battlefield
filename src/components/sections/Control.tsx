import { FC, useEffect, useState } from "react";
import { ElementId, PunishmentId, RewardId } from "../../types";
import useStore from "../../hooks/useStore";
import Slot from "../elements/Slot";
import Card from "../elements/Card";
import Button from "../elements/Button";
import Element from "../elements/Element";

const Control: FC = () => {
  const {
    state: { elements, rewards, punishments },
  } = useStore();
  const [slots, setSlots] = useState<ElementId[][]>([]);
  const [isReroll, setIsReroll] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [result, setResult] = useState<ElementId>();
  const [rewardId, setRewardId] = useState<RewardId>();
  const [punishmentId, setPunishmentId] = useState<PunishmentId>();

  const getLastItem = (array: any[]) => {
    return array[array.length - 1];
  };

  const shuffleArray = (array: any[], ignore: any[] | null = null) => {
    const newArray = ignore ? array.filter((item) => !ignore.includes(item)) : array;
    return newArray.sort(() => Math.random() - 0.5);
  };

  const getRandomItem = (array: any[], ignore: any[] | null = null) => {
    return getLastItem(shuffleArray(array, ignore));
  };

  const getNewSlots = (probability: { triple: number; double: number }) => {
    const base = Object.keys(elements);

    const getSlots = (targetElementId: ElementId) => {
      const slot = [...shuffleArray(base, [targetElementId]), targetElementId];
      return [...slot, ...slot, ...slot];
    };

    const randomNumber = Math.random();

    let results: {
      type: "TRIPLE" | "DOUBLE" | "SINGLE";
      elementId?: ElementId;
      slots: ElementId[][];
    } = {
      type: "SINGLE",
      slots: [],
    };

    if (randomNumber <= probability.triple) {
      const elementId = getRandomItem(base);

      results = {
        type: "TRIPLE",
        elementId,
        slots: [getSlots(elementId), getSlots(elementId), getSlots(elementId)],
      };
    } else if (randomNumber <= probability.triple + probability.double) {
      const elementId = getRandomItem(base);
      const lastElementId = getRandomItem(base, [elementId]);

      results = {
        type: "DOUBLE",
        elementId,
        slots: shuffleArray([getSlots(elementId), getSlots(elementId), getSlots(lastElementId)]),
      };
    } else {
      const firstElementId = getRandomItem(base);
      const secondElementId = getRandomItem(base, [firstElementId]);
      const thirdElementId = getRandomItem(base, [firstElementId, secondElementId]);

      results = {
        type: "SINGLE",
        slots: [getSlots(firstElementId), getSlots(secondElementId), getSlots(thirdElementId)],
      };
    }

    return results;
  };

  useEffect(() => {
    if (!isShowOverlay && !isReroll) return;
    const results = getNewSlots({ triple: 0.25, double: 0.25 });
    setSlots(results.slots);
    setResult(results.elementId);
  }, [isShowOverlay, isReroll]);

  const handleDraw = () => {
    setIsShowOverlay(true);
    setIsCompleted(false);
    setResult(undefined);
  };

  const handleReroll = () => {
    setIsReroll(!isReroll);
    setIsCompleted(false);
    setResult(undefined);

    const result: PunishmentId = getRandomItem(Object.keys(punishments));
    setPunishmentId(result);
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
            <div className="flex justify-center">
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
            {isCompleted && (
              <div className="rounded-3xl border-4 border-white/10 p-4 text-center font-bold uppercase text-white">
                {result ? (
                  <div className="flex flex-wrap gap-4">
                    {elements[result]?.deck.map((cardId, index) => (
                      <Card key={`${cardId}-${index}`} id={cardId} />
                    ))}
                  </div>
                ) : (
                  <div>Embrace a random punishment and earn a reroll</div>
                )}
              </div>
            )}
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
