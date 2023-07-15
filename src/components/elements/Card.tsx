import { gsap, Circ } from "gsap";
import { FC, DragEvent, useState, useEffect, useRef } from "react";
import useStore from "../../hooks/useStore";
import { CardId, CardProps } from "../../types";

const Card: FC<CardProps> = ({ id, isDraggable = true }) => {
  const {
    state: { socket, form, cards },
    dispatch,
  } = useStore();
  const card = cards[id as CardId];
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", id);
    dispatch({ type: "DRAGGING_CARD", payload: id });
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    const targetCard = cardRef.current as HTMLDivElement;
    const {
      offsetLeft: cardX,
      offsetTop: cardY,
      offsetHeight: cardHeight,
      offsetWidth: cardWidth,
    } = targetCard;
    const { innerWidth: screenWidth, innerHeight: screenHeight } = window;

    const x = screenWidth / 2 - cardWidth / 2 - cardX;
    const y = screenHeight / 2 - cardHeight / 2 - cardY;

    const handleComplete = () => {
      setTimeout(() => {
        dispatch({ type: "SELF_DECK", payload: id });
      }, 500);
    };

    gsap.to(targetCard, {
      x,
      y,
      ease: Circ.easeInOut,
      duration: 1,
      onComplete: handleComplete,
    });
  };

  return (
    <div
      ref={cardRef}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`-ml-8 flex h-full max-h-40 w-32 flex-col items-center justify-center gap-4 rounded-2xl border-4 border-white/10 p-4 text-white backdrop-blur-3xl transition-all hover:z-10 hover:-translate-y-2 hover:border-theme${
        isDragging ? " cursor-grabbing opacity-0" : ""
      }${isDraggable ? " cursor-grab" : " cursor-not-allowed"}`}
    >
      <div>{card.name}</div>
      <div>{card.price}</div>
    </div>
  );
};

export default Card;
