import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://hygge-backend-production.up.railway.app";

export const socket = io(URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to socket server");
});
socket.on("disconnect", () => {
  console.log("Disconnected from sockeet server");
});
