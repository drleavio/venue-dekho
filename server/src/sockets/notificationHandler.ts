import { Server, Socket } from "socket.io";

export const registerNotificationHandlers = (io: Server, socket: Socket) => {
  // User joins their private notification room on login
  socket.on("join_notification_room", (userId: string) => {
    socket.join(userId);
    console.log(`User ${userId} is ready for notifications`);
  });
};