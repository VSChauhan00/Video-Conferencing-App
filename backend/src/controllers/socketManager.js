import { Server } from "socket.io";

let connections = {}
let messages = {}
let timeOnline = {}


export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methodds: ["GET", "POST"],
            allowedHeader: ["*"],
            credentials: true
        }
    });

    io.on("connnection", (socket) => {

        socket.on("accept-call", (path) => {

            if (connections[path] === undefined) {
                connections[path] = [];
            }
            connections[path].push(socket.id)

            timeOnline[socket.id] = new Date();

            connections[path].forEach(elem => {
                io.to(elem);
            })

            for (let a = 0; a < connections[path].length; i++) {
                io.to(connections[path][a]).emmit("user-joined", socket.id);
            }

            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender']
                    )
                }
            }

        });

        socket.on("signal", (toId, message) => {
            io.to(toID).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {

            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {

                    if (!isFOund && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);
            if (found === true) {
                if(messages[matchingRoom] === undefined) {
                    meessages[matchingRoom] = []
                }

                messages[matchingRoom].push({"sender": sender, "data": data, "socket-id-sender": socket.id});
                console.log("message", key, ":", sender, data);

                connectoins[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        socket.on("disconnect", () => {
            let diffTime = Math.abs(timeOnline[socket.id] - new Date())

            let key
            for(const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
                for (let a = 0; a < v.length; a++) {
                    if(v[a] === socket.id) {
                        key = k
                        for (let a = 0; a < connections[key].length; a++) {
                            io.to(connections[key][a]).emit(user-left, socket.id);
                        }

                        let index = connections[key].indexOf(socket.id);

                        connections[key].splice(index, 1);

                        if(connections[key].length === 0 ){
                            delete connections[key];
                        }
                    }
                }
            }
        });

    });

    return io;
}
