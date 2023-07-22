import { Dispatch, ReactNode, MouseEvent } from "react";
import { Socket } from "socket.io-client";

export enum COLOR {
  GRAY = "bg-gray-400",
  GREEN = "bg-green-400",
  BLUE = "bg-blue-400",
  RED = "bg-red-400",
  AMBER = "bg-amber-400",
  INDIGO = "bg-indigo-400",
}

type Player = {
  id: string;
  name: string;
};

export type ElementId = "E1" | "E2" | "E3" | "E4" | "E5" | "E6";

type Element = {
  name: string;
  color: COLOR;
  deck: CardId[];
};

export type CardId = "C1" | "C2" | "C3" | "C4" | "C5" | "C6" | "C7" | "C8";

type Card = {
  name: string;
  price: number;
  color: COLOR;
};

export type DropzoneId = "D1" | "D2" | "D3" | "D4" | "D5" | "D6" | "D7" | "D8";

type Dropzone = {
  name: string;
  color: COLOR;
  status: number;
  values: Partial<Record<CardId, number>>;
  allowedCardIds: Record<number, CardId[]>;
};

export type RewardId = "R1" | "R2" | "R3" | "R4";

export type PunishmentId = "P1" | "P2" | "P3" | "P4";

export type Room = {
  id: string;
  players: Player[];
};

export type Message = {
  type: "NOTIFICATION" | "MESSAGE";
  playerName: string;
  content: string;
};

export type Form = {
  serverUrl: string;
  playerName: string;
  roomId: string;
};

export type State = {
  self: {
    deck: CardId[];
    wealth: number;
    draggingCardIndex: number | null;
  };
  rival: {
    deck: CardId[];
    wealth: number;
    draggingCardIndex: number | null;
    targetDropzoneId: DropzoneId | null;
  };
  rewards: Record<RewardId, string>;
  punishments: Record<PunishmentId, string>;
  form: Form;
  room: Room;
  messages: Message[];
  socket: Socket | null;
  cards: Record<CardId, Card>;
  elements: Record<ElementId, Element>;
  dropzones: Record<DropzoneId, Dropzone>;
};

export type Action =
  | { type: "SOCKET"; payload: Socket }
  | { type: "FORM"; payload: Form }
  | { type: "ROOM"; payload: Room }
  | { type: "CHAT"; payload: Message }
  | { type: "CLEAR_CHAT"; payload?: never }
  | { type: "SELF_DECK"; payload: number }
  | { type: "SELF_DRAGGING_CARD"; payload: number | null }
  | { type: "RIVAL_DRAGGING_CARD"; payload: number | null }
  | { type: "RIVAL_TARGET_DROPZONE"; payload: DropzoneId | null }
  | {
      type: "UPGRADE_DROPZONE";
      payload: { dropzoneId: DropzoneId; status: number };
    };

export type Context = {
  state: State;
  dispatch: Dispatch<Action>;
};

export type IconProps = {
  name?: string;
  isLoading?: boolean;
  isTruncate?: boolean;
  size?: "NORMAL" | "LARGE";
  copyable?: boolean;
  children?: ReactNode;
};

export type ButtonProps = {
  name: string;
  disabled?: boolean;
  children?: ReactNode;
  size?: "SMALL" | "NORMAL";
  stretch?: boolean;
  action?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type PlayerProps = {
  name: string;
  isSelf?: boolean;
};

export type MessageProps = {
  isSelf: boolean;
  data: Message;
};

export type ChatProps = {
  isCollapse: boolean;
  toggleCollapse: (isCollapse: boolean) => void;
};

export type ElementDrops = {
  id: ElementId;
};

export type SlotDrops = {
  elements: ElementId[];
  order: number;
  isReroll: boolean;
  completed: () => void;
};

export type CardProps = {
  id: CardId;
  index?: number;
  type?: "DEFAULT" | "SELF" | "RIVAL";
};

export type DropzoneProps = {
  id: DropzoneId;
};

export type LineProps = {
  coordinates: number[];
};
