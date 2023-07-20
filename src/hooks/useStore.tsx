import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import { State, Action, Context, COLOR } from "../types";

const initialState: State = {
  self: {
    deck: ["C1", "C1", "C2", "C8", "C4", "C5", "C3", "C6", "C7", "C8"],
    wealth: 2000,
    draggingCardIndex: null,
  },
  rival: {
    deck: ["C1", "C1", "C2", "C8", "C4", "C5", "C3", "C6", "C7", "C8"],
    wealth: 2000,
    draggingCardIndex: null,
    targetDropzoneId: null,
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
  elements: {
    E0: {
      name: "Question_mark",
      color: COLOR.GRAY,
      deck: [],
    },
    E1: {
      name: "Handyman",
      color: COLOR.GRAY,
      deck: ["C1", "C7"],
    },
    E2: {
      name: "Forest",
      color: COLOR.GREEN,
      deck: ["C1", "C2"],
    },
    E3: {
      name: "Waves",
      color: COLOR.BLUE,
      deck: ["C1", "C2", "C3", "C4", "C5"],
    },
    E4: {
      name: "Local_fire_department",
      color: COLOR.RED,
      deck: ["C5", "C6", "C7"],
    },
    E5: {
      name: "Public",
      color: COLOR.AMBER,
      deck: ["C7", "C8"],
    },
    E6: {
      name: "Switch_access",
      color: COLOR.INDIGO,
      deck: ["C4", "C5", "C5", "C6"],
    },
  },
  cards: {
    C1: { name: "Card 1", price: 175, color: COLOR.RED },
    C2: { name: "Card 2", price: 200, color: COLOR.AMBER },
    C3: { name: "Card 3", price: 300, color: COLOR.BLUE },
    C4: { name: "Card 4", price: 50, color: COLOR.RED },
    C5: { name: "Card 5", price: 150, color: COLOR.AMBER },
    C6: { name: "Card 6", price: 500, color: COLOR.BLUE },
    C7: { name: "Card 7", price: 75, color: COLOR.RED },
    C8: { name: "Card 8", price: 400, color: COLOR.AMBER },
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
      color: COLOR.AMBER,
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
    D5: {
      name: "Dropzone 5",
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
    D6: {
      name: "Dropzone 6",
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
    D7: {
      name: "Dropzone 7",
      color: COLOR.AMBER,
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
    D8: {
      name: "Dropzone 8",
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
      const newDeck = [...state.self.deck];
      newDeck.splice(payload, 1);

      return {
        ...state,
        self: {
          ...state.self,
          deck: newDeck,
        },
      };

    case "SELF_DRAGGING_CARD":
      return {
        ...state,
        self: {
          ...state.self,
          draggingCardIndex: payload,
        },
      };

    case "RIVAL_DRAGGING_CARD":
      return {
        ...state,
        rival: {
          ...state.rival,
          draggingCardIndex: payload,
        },
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

    case "RIVAL_TARGET_DROPZONE":
      return {
        ...state,
        rival: {
          ...state.rival,
          targetDropzoneId: payload,
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

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export { StoreProvider };
export default useStore;
