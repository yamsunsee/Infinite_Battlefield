import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../hooks/useStore";
import Chat from "../components/sections/Chat";
import Icon from "../components/elements/Icon";

const MainLayout = () => {
  const navigate = useNavigate();
  const {
    state: { socket, form, self, rival },
    dispatch,
  } = useStore();
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    dispatch({
      type: "CHAT",
      payload: {
        type: "NOTIFICATION",
        playerName: "",
        content: "You has joined room",
      },
    });
  }, []);

  useEffect(() => {
    socket?.emit("SERVER", {
      type: "DRAG_START",
      payload: {
        roomId: form.roomId,
        cardIndex: self.draggingCardIndex,
      },
    });
  }, [self.draggingCardIndex]);

  useEffect(() => {
    socket?.emit("SERVER", {
      type: "DRAG_OVER",
      payload: {
        roomId: form.roomId,
        dropzoneId: rival.targetDropzoneId,
      },
    });
  }, [rival.targetDropzoneId]);

  useEffect(() => {
    if (socket) {
      socket.on("CLIENT", (action) => {
        const { type, payload } = action;

        switch (type) {
          case "NOTIFICATIONS":
            dispatch({
              type: "CHAT",
              payload: {
                type: "NOTIFICATION",
                playerName: payload.playerName,
                content: payload.content,
              },
            });
            dispatch({
              type: "ROOM",
              payload: payload.room,
            });
            break;

          case "MESSAGES":
            dispatch({
              type: "CHAT",
              payload: { type: "MESSAGE", ...payload },
            });
            break;

          case "DRAG_START":
            dispatch({ type: "RIVAL_DRAGGING_CARD", payload: payload.cardIndex });
            break;

          case "DRAG_OVER":
            dispatch({ type: "RIVAL_TARGET_DROPZONE", payload: payload.dropzoneId });
            break;

          default:
            break;
        }
      });

      socket.on("connect_error", () => {
        toast.error("Something went wrong! Looks like the server is down!");
        navigate("/login");
        socket.close();
      });
    } else {
      const localData = sessionStorage.getItem("INFINITE_BATTLEFIELD");

      if (localData) {
        const localForm = JSON.parse(localData);

        const newSocket = io(localForm.serverUrl, {
          extraHeaders: {
            "ngrok-skip-browser-warning": "false",
          },
        });

        const toastId = toast(<Icon isLoading>Reconnecting to the server...</Icon>, {
          autoClose: false,
        });

        newSocket.on("connect_error", () => {
          toast.update(toastId, {
            render: (
              <>
                <div>Failed to reconnect to the server!</div>
                <div>Something went wrong! Please try again!</div>
              </>
            ),
            type: "error",
            autoClose: 3000,
          });
          navigate("/login");
          newSocket.close();
        });

        newSocket.emit("SERVER", {
          type: "JOIN_ROOM",
          payload: {
            playerName: localForm.playerName,
            roomId: localForm.roomId,
          },
        });

        newSocket.on("CLIENT", (action) => {
          const { type, payload } = action;

          switch (type) {
            case "NOTIFICATIONS":
              dispatch({ type: "SOCKET", payload: newSocket });
              dispatch({ type: "FORM", payload: localForm });
              dispatch({
                type: "ROOM",
                payload: payload.room,
              });
              toast.update(toastId, {
                render: "Successfully reconnected to the server!",
                type: "success",
                autoClose: 3000,
              });
              break;

            case "ERRORS":
              toast.update(toastId, {
                render: payload.message,
                type: "error",
                autoClose: 3000,
              });
              navigate("/login");
              break;

            default:
              break;
          }
        });
      } else navigate("/login");
    }
  }, [socket]);

  return (
    <>
      {form.serverUrl && (
        <div
          className={`flex h-screen bg-[url('/images/background.jpg')] bg-cover bg-no-repeat p-4 ${
            !isCollapse ? " gap-4" : ""
          }`}
        >
          <Chat isCollapse={isCollapse} toggleCollapse={setIsCollapse} />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default MainLayout;
