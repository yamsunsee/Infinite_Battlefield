import { FC } from "react";
import useStore from "../../hooks/useStore";
import { DropzoneId } from "../../types";
import Dropzone from "../elements/Dropzone";

const Battlefield: FC = () => {
  const {
    state: { dropzones },
  } = useStore();
  const dropzoneIds = Object.keys(dropzones) as DropzoneId[];

  return (
    <div className="grid grid-cols-4 gap-4 border border-white/10 p-4">
      {dropzoneIds.map((dropzoneId) => (
        <Dropzone key={dropzoneId} id={dropzoneId} />
      ))}
    </div>
  );
};

export default Battlefield;
