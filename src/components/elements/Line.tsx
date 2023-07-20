import { FC } from "react";
import { LineProps } from "../../types";

const Line: FC<LineProps> = ({ coordinates }) => {
  const [x1, y1, x2, y2] = coordinates;
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  const lineStyle = {
    position: "absolute" as "absolute",
    top: y1,
    left: x1,
    width: length,
    height: 4,
    transform: `rotate(${angle}deg)`,
    transformOrigin: "top left",
    backgroundColor: "#fb923c",
  };

  return <div style={lineStyle}></div>;
};

export default Line;
