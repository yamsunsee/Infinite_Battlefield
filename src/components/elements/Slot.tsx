import { gsap, Circ } from "gsap";
import { FC, useEffect, useRef, useState } from "react";
import { SlotDrops } from "../../types";
import Element from "./Element";

const Slot: FC<SlotDrops> = ({ elements, order, isReroll, completed }) => {
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAnimationEnd(false);
    gsap.fromTo(
      slotRef.current,
      {
        y: 0,
      },
      {
        y: (1 - elements.length) * 144,
        duration: elements.length * 0.2 + order * 0.5,
        ease: Circ.easeOut,
        onComplete,
      }
    );
  }, [isReroll]);

  const onComplete = () => {
    setIsAnimationEnd(true);
    if (order === 2) completed();
  };

  return (
    <div
      className={`aspect-square h-[168px] overflow-hidden border-4 p-4 ${
        isAnimationEnd ? "border-white/50" : " border-white/10"
      }${
        [" rounded-l-3xl", " border-l-0", " rounded-r-3xl border-l-0"][order]
      }`}
    >
      <div ref={slotRef} className="flex flex-col gap-4">
        {elements.map((elementId, index) => (
          <Element key={`${elementId}-${index}`} id={elementId} />
        ))}
      </div>
    </div>
  );
};

export default Slot;
