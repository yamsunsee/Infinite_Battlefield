import { Dispatch, ReactNode, MouseEvent } from "react";
import { Socket } from "socket.io-client";

export enum COLOR {
  RED = "bg-red-400",
  BLUE = "bg-blue-400",
  YELLOW = "bg-yellow-400",
}

type Player = {
  id: string;
  name: string;
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
  level: number;
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
  socket: Socket | null;
  form: Form;
  room: Room;
  messages: Message[];
  cards: Record<CardId, Card>;
  dropzones: Record<DropzoneId, Dropzone>;
};

export type Action =
  | { type: "SOCKET"; payload: Socket }
  | { type: "FORM"; payload: Form }
  | { type: "ROOM"; payload: Room }
  | { type: "CHAT"; payload: Message }
  | { type: "CLEAR_CHAT" }
  | { type: "SELF_DECK"; payload: CardId };

export type Context = {
  state: State;
  dispatch: Dispatch<Action>;
};

export type IconProps = {
  name?: string;
  isLoading?: boolean;
  isTruncate?: boolean;
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

export type CardProps = {
  id: CardId;
  isDraggable?: boolean;
  onDragStart: (cardId: CardId) => void;
};

export type DropzoneProps = {
  id: DropzoneId;
  draggingCard: CardId | null;
};
