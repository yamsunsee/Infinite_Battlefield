import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import { State, Action, Context, COLOR } from "../types";

const initialState: State = {
  self: {
    deck: ["C1", "C2", "C3"],
    wealth: 2000,
  },
  rival: {
    deck: [],
    wealth: 2000,
  },
  socket: null,
  form: {
    serverUrl: "",
    playerName: "",
    roomId: "",
  },
  room: {
    id: "",
    players: [],
  },
  messages: [],
  cards: {
    C1: { name: "Card 1", price: 200, color: COLOR.RED },
    C2: { name: "Card 2", price: 200, color: COLOR.YELLOW },
    C3: { name: "Card 3", price: 300, color: COLOR.BLUE },
  },
  dropzones: {
    D1: {
      name: "Dropzone 1",
      color: COLOR.BLUE,
      level: 0,
      allowedCardIds: {
        0: ["C1"],
        1: ["C2", "C3"],
      },
    },
    D2: {
      name: "Dropzone 2",
      color: COLOR.RED,
      level: 0,
      allowedCardIds: {
        0: ["C1", "C2", "C3"],
      },
    },
    D3: {
      name: "Dropzone 3",
      color: COLOR.YELLOW,
      level: 0,
      allowedCardIds: {
        0: ["C1", "C2", "C3"],
      },
    },
    D4: {
      name: "Dropzone 4",
      color: COLOR.BLUE,
      level: 0,
      allowedCardIds: {
        0: ["C2"],
        1: ["C3"],
      },
    },
  },
};

const storeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SOCKET":
      return {
        ...state,
        socket: action.payload,
      };

    case "FORM":
      sessionStorage.setItem(
        "INFINITE_BATTLEFIELD",
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        form: action.payload,
      };

    case "ROOM":
      return {
        ...state,
        room: action.payload,
      };

    case "CHAT":
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };

    case "CLEAR_CHAT":
      return {
        ...state,
        messages: [],
      };

    case "SELF_DECK":
      return {
        ...state,
        self: {
          ...state.self,
          deck: state.self.deck.filter((cardId) => cardId !== action.payload),
        },
      };

    default:
      return state;
  }
};

const StoreContext = createContext<Context>({} as Context);
const useStore = () => useContext(StoreContext);

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
export default useStore;
