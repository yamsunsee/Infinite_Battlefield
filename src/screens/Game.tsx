import Control from "../components/sections/Control";
import Rival from "../components/sections/Rival";
import Battlefield from "../components/sections/Battlefield";
import Self from "../components/sections/Self";

const Game = () => {
  return (
    <div className="flex w-full gap-4">
      <div className="grid flex-1 grid-rows-[1fr_2fr_1fr] gap-4">
        <Rival />
        <Battlefield />
        <Self />
      </div>
      <Control />
    </div>
  );
};

export default Game;
