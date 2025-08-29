// import { Server } from "socket.io"


// let connections = {}
// let messages = {}
// let timeOnline = {}

// export const connectToSocket = (server) => {
//     const io = new Server(server, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"],
//             allowedHeaders: ["*"],
//             credentials: true
//         }
//     });


//     io.on("connection", (socket) => {

//         console.log("SOMETHING CONNECTED")

//         socket.on("join-call", (path) => {

//             if (connections[path] === undefined) {
//                 connections[path] = []
//             }
//             connections[path].push(socket.id)

//             timeOnline[socket.id] = new Date();

//             // connections[path].forEach(elem => {
//             //     io.to(elem)
//             // })

//             for (let a = 0; a < connections[path].length; a++) {
//                 io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
//             }

//             if (messages[path] !== undefined) {
//                 for (let a = 0; a < messages[path].length; ++a) {
//                     io.to(socket.id).emit("chat-message", messages[path][a]['data'],
//                         messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
//                 }
//             }

//         })

//         socket.on("signal", (toId, message) => {
//             io.to(toId).emit("signal", socket.id, message);
//         })

//         socket.on("chat-message", (data, sender) => {

//             const [matchingRoom, found] = Object.entries(connections)
//                 .reduce(([room, isFound], [roomKey, roomValue]) => {


//                     if (!isFound && roomValue.includes(socket.id)) {
//                         return [roomKey, true];
//                     }

//                     return [room, isFound];

//                 }, ['', false]);

//             if (found === true) {
//                 if (messages[matchingRoom] === undefined) {
//                     messages[matchingRoom] = []
//                 }

//                 messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
//                 console.log("message", matchingRoom, ":", sender, data)

//                 connections[matchingRoom].forEach((elem) => {
//                     io.to(elem).emit("chat-message", data, sender, socket.id)
//                 })
//             }

//         })

//         socket.on("disconnect", () => {

//             var diffTime = Math.abs(timeOnline[socket.id] - new Date())

//             var key

//             for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

//                 for (let a = 0; a < v.length; ++a) {
//                     if (v[a] === socket.id) {
//                         key = k

//                         for (let a = 0; a < connections[key].length; ++a) {
//                             io.to(connections[key][a]).emit('user-left', socket.id)
//                         }

//                         var index = connections[key].indexOf(socket.id)

//                         connections[key].splice(index, 1)


//                         if (connections[key].length === 0) {
//                             delete connections[key]
//                         }
//                     }
//                 }

//             }


//         })


//     })


//     return io;
// }


// with whiteboard logic
// import { Server } from "socket.io"

// let connections = {}
// let messages = {}
// let timeOnline = {}


// export const connectToSocket = (server) => {
//     const io = new Server(server, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"],
//             allowedHeaders: ["*"],
//             credentials: true
//         }
//     });

//     io.on("connection", (socket) => {
//         console.log("SOMETHING CONNECTED")

//         socket.on("join-call", (path) => {
//             if (connections[path] === undefined) {
//                 connections[path] = []
//             }
//             connections[path].push(socket.id)
//             timeOnline[socket.id] = new Date();

//             // Notify all users in room
//             for (let a = 0; a < connections[path].length; a++) {
//                 io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
//             }

//             // Send old messages to new user
//             if (messages[path] !== undefined) {
//                 for (let a = 0; a < messages[path].length; ++a) {
//                     io.to(socket.id).emit("chat-message",
//                         messages[path][a]['data'],
//                         messages[path][a]['sender'],
//                         messages[path][a]['socket-id-sender']
//                     )
//                 }
//             }
//         })

//         // WebRTC signaling
//         socket.on("signal", (toId, message) => {
//             io.to(toId).emit("signal", socket.id, message);
//         })

//         // Chat message handling
//         socket.on("chat-message", (data, sender) => {
//             const [matchingRoom, found] = Object.entries(connections)
//                 .reduce(([room, isFound], [roomKey, roomValue]) => {
//                     if (!isFound && roomValue.includes(socket.id)) {
//                         return [roomKey, true];
//                     }
//                     return [room, isFound];
//                 }, ['', false]);

//             if (found === true) {
//                 if (messages[matchingRoom] === undefined) {
//                     messages[matchingRoom] = []
//                 }
//                 messages[matchingRoom].push({
//                     'sender': sender,
//                     "data": data,
//                     "socket-id-sender": socket.id
//                 })
//                 console.log("message", matchingRoom, ":", sender, data)

//                 connections[matchingRoom].forEach((elem) => {
//                     io.to(elem).emit("chat-message", data, sender, socket.id)
//                 })
//             }
//         })

//         // -----------------------
//         // Whiteboard Handlers 📝
//         // -----------------------
//         socket.on("wb-draw", ({ roomId, seg }) => {
//             socket.to(roomId).emit("wb-draw", seg);
//         });

//         socket.on("wb-clear", ({ roomId }) => {
//             socket.to(roomId).emit("wb-clear");
//         });

//         // Disconnect logic
//         socket.on("disconnect", () => {
//             var diffTime = Math.abs(timeOnline[socket.id] - new Date())
//             var key

//             for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
//                 for (let a = 0; a < v.length; ++a) {
//                     if (v[a] === socket.id) {
//                         key = k

//                         for (let a = 0; a < connections[key].length; ++a) {
//                             io.to(connections[key][a]).emit('user-left', socket.id)
//                         }

//                         var index = connections[key].indexOf(socket.id)
//                         connections[key].splice(index, 1)

//                         if (connections[key].length === 0) {
//                             delete connections[key]
//                         }
//                     }
//                 }
//             }
//         })
//     })

//     return io;
// }


// lest add file sharing  feature 
import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

// 🆕 New storage for Notes & Files
let teamNotes = {}; // { roomId: "latest note content" }
let teamFiles = {}; // { roomId: [ { id, name, type, dataUrl, sender } ] }

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 SOMETHING CONNECTED");

    // ---- Join Call ----
    socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      connections[path].push(socket.id);

      timeOnline[socket.id] = new Date();

      // notify existing users
      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path]
        );
      }

      // send chat history
      if (messages[path] !== undefined) {
        for (let a = 0; a < messages[path].length; ++a) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][a]["data"],
            messages[path][a]["sender"],
            messages[path][a]["socket-id-sender"]
          );
        }
      }

      // 🆕 send existing team notes to new user
      if (teamNotes[path] !== undefined) {
        io.to(socket.id).emit("team-notes-update", {
          content: teamNotes[path],
        });
      }

      // 🆕 send existing team files to new user
      if (teamFiles[path] !== undefined) {
        for (let f of teamFiles[path]) {
          io.to(socket.id).emit("team-file", f);
        }
      }
    });

    // ---- WebRTC Signal ----
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    // ---- Chat Messages ----
    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false]
      );

      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": socket.id,
        });
        console.log("💬 message", matchingRoom, ":", sender, data);

        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    // ---- 🆕 Team Notes ----
    socket.on("team-notes-update", ({ roomId, content }) => {
      teamNotes[roomId] = content;
      socket.to(roomId).emit("team-notes-update", { content });
    });

    // ---- 🆕 Team File Upload ----
    socket.on("team-file", ({ roomId, file }) => {
      if (!teamFiles[roomId]) teamFiles[roomId] = [];
      const fileRecord = {
        ...file,
        id: Date.now() + "-" + Math.random().toString(36).slice(2),
      };
      teamFiles[roomId].push(fileRecord);
      socket.to(roomId).emit("team-file", fileRecord);
    });

    // ---- Disconnect ----
    socket.on("disconnect", () => {
      var diffTime = Math.abs(timeOnline[socket.id] - new Date());

      var key;
      for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
        for (let a = 0; a < v.length; ++a) {
          if (v[a] === socket.id) {
            key = k;

            for (let a = 0; a < connections[key].length; ++a) {
              io.to(connections[key][a]).emit("user-left", socket.id);
            }

            var index = connections[key].indexOf(socket.id);
            connections[key].splice(index, 1);

            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });

  return io;
};
