import { gsap, Circ } from "gsap";
import { FC, useRef, useEffect, MouseEvent } from "react";
import useStore from "../../hooks/useStore";
import { ElementId, ElementDrops } from "../../types";
import Icon from "./Icon";

const Element: FC<ElementDrops> = ({ id }) => {
  const {
    state: { elements },
  } = useStore();
  const element = elements[id as ElementId];
  const elementRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   gsap.fromTo(
  //     elementRef.current,
  //     {
  //       y: -400,
  //       scale: 0,
  //       opacity: 0,
  //     },
  //     {
  //       y: -200,
  //       scale: 1,
  //       opacity: 1,
  //       duration: 1,
  //       rotateY: 360,
  //       perspective: 1000,
  //       ease: Circ.easeOut,
  //     }
  //   );
  // }, []);

  const handleClick = () => {
    const targetElement = elementRef.current as HTMLDivElement;
    const {
      offsetLeft: elementX,
      offsetTop: elementY,
      offsetHeight: elementHeight,
      offsetWidth: elementWidth,
    } = targetElement;
    const { innerWidth: screenWidth, innerHeight: screenHeight } = window;

    const x = screenWidth / 2 - elementWidth / 2 - elementX;
    const y = screenHeight / 2 - elementHeight / 2 - elementY;

    const handleAnimationComplete = () => {
      setTimeout(() => {
        console.log("Done");
      }, 500);
    };

    gsap.to(targetElement, {
      x,
      y,
      duration: 1,
      ease: Circ.easeOut,
      onComplete: handleAnimationComplete,
    });
  };

  return (
    <div
      ref={elementRef}
      className={`flex h-32 w-32 flex-col items-center justify-center gap-4 rounded-2xl border-4 border-white/50 p-4 font-bold text-white backdrop-blur-3xl ${element.color}`}
    >
      <Icon name={element.name} size="LARGE" />
    </div>
  );
};

export default Element;
