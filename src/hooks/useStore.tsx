import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import { State, Action, Context, COLOR } from "../types";

const initialState: State = {
  self: {
    deck: ["C1", "C2", "C3"],
    wealth: 2000,
  },
  rival: {
    deck: ["C1", "C2", "C3"],
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
  draggingCard: null,
  cards: {
    C1: { name: "Card 1", price: 200, color: COLOR.RED },
    C2: { name: "Card 2", price: 200, color: COLOR.YELLOW },
    C3: { name: "Card 3", price: 300, color: COLOR.BLUE },
  },
  dropzones: {
    D1: {
      name: "Dropzone 1",
      color: COLOR.BLUE,
      status: 0,
      values: {
        C1: 1,
        C2: 2,
        C3: 2,
      },
      allowedCardIds: {
        0: ["C1"],
        1: ["C2", "C3"],
        2: [],
      },
    },
    D2: {
      name: "Dropzone 2",
      color: COLOR.RED,
      status: 0,
      values: {
        C1: 1,
        C2: 1,
        C3: 1,
      },
      allowedCardIds: {
        0: ["C1", "C2", "C3"],
        1: [],
      },
    },
    D3: {
      name: "Dropzone 3",
      color: COLOR.YELLOW,
      status: 0,
      values: {
        C1: 1,
        C2: 2,
        C3: 2,
      },
      allowedCardIds: {
        0: ["C1"],
        1: ["C2"],
        2: ["C3"],
        3: [],
      },
    },
    D4: {
      name: "Dropzone 4",
      color: COLOR.BLUE,
      status: 0,
      values: {
        C2: 1,
        C3: 2,
      },
      allowedCardIds: {
        0: ["C2"],
        1: ["C3"],
        2: [],
      },
    },
  },
};

const storeReducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case "SOCKET":
      return {
        ...state,
        socket: payload,
      };

    case "FORM":
      sessionStorage.setItem("INFINITE_BATTLEFIELD", JSON.stringify(payload));
      return {
        ...state,
        form: payload,
      };

    case "ROOM":
      return {
        ...state,
        room: payload,
      };

    case "CHAT":
      return {
        ...state,
        messages: [payload, ...state.messages],
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
          deck: state.self.deck.filter((cardId) => cardId !== payload),
        },
      };

    case "DRAGGING_CARD":
      return {
        ...state,
        draggingCard: payload,
      };

    case "UPGRADE_DROPZONE":
      const { dropzoneId, status } = payload;
      return {
        ...state,
        dropzones: {
          ...state.dropzones,
          [dropzoneId]: {
            ...state.dropzones[dropzoneId],
            status: status,
          },
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
