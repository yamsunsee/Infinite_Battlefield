import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useStore from "../hooks/useStore";
import Chat from "../components/sections/Chat";
import { toast } from "react-toastify";
import Icon from "../components/elements/Icon";

const MainLayout = () => {
  const navigate = useNavigate();
  const {
    state: { socket, form },
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
          transports: ["websocket", "polling"],
        });

        const toastId = toast(
          <Icon isLoading>Reconnecting to the server...</Icon>,
          {
            autoClose: false,
          }
        );

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
