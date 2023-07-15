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
};

export type CardId = "C1" | "C2" | "C3";

type Card = {
  name: string;
  price: number;
  color: COLOR;
};

export type DropzoneId = "D1" | "D2" | "D3" | "D4";

type Dropzone = {
  name: string;
  color: COLOR;
  status: number;
  values: Partial<Record<CardId, number>>;
  allowedCardIds: Record<number, CardId[]>;
};

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
  };
  rival: {
    deck: CardId[];
    wealth: number;
  };
  form: Form;
  room: Room;
  messages: Message[];
  socket: Socket | null;
  draggingCard: CardId | null;
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
  | { type: "DRAGGING_CARD"; payload: CardId }
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
  index: number;
};

export type CardProps = {
  id: CardId;
  index: number;
  isDraggable?: boolean;
};

export type DropzoneProps = {
  id: DropzoneId;
};
