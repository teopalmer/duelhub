import { Env, getEnv } from "@/lib/env";
import { createContext } from "react";
import { Socket, io } from "socket.io-client";

const { internalEndpoint, env } = getEnv();

export const SOCKET_URL = "/api/internal/socketio";

const config =
  env === Env.DEV || process.env.NEXT_PUBLIC_CI_MODE
    ? {
        path: SOCKET_URL,
        addTrailingSlash: false,
        autoConnect: false,
        reconnection: true,
        reconnectionDelay: 10000,
        reconnectionDelayMax: 10000,
        reconnectionAttempts: Infinity,
      }
    : {
        autoConnect: false,
        reconnection: true,
        reconnectionDelay: 10000,
        reconnectionDelayMax: 10000,
        reconnectionAttempts: Infinity,
      };

export enum SOCKET_EVENT {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  JOIN_ROOM = "JOIN_ROOM",
  LEAVE_ROOM = "LEAVE_ROOM",
  CHAT_MESSAGE = "CHAT_MESSAGE",
  USER_JOINED = "USER_JOINED",
  USER_LEFT = "USER_LEFT",
  USER_READY = "USER_READY",
  USER_NOT_READY = "USER_NOT_READY",
  GAME_STARTED = "GAME_STARTED",
  GAME_ENDED = "GAME_ENDED",
  HOST_CHANGED = "HOST_CHANGED",
  ROOM_CLOSED = "ROOM_CLOSED",
}

export const createSocket = (token: string | null | undefined) => {
  return io(internalEndpoint, { auth: { token }, ...config });
};

type StoreContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<StoreContextType>({
  socket: null,
});

export default SocketContext;
