// require all the modules
let express = require("express");
let cors = require('cors');
let app = express();

// setup cors module middleware with express
app.use(cors());
// setup middleware for static files location
app.use(express.static('./dist'));

// Socket.io has to work with an HTTP server - so creating HTTP server based on express server
let server = require("http").Server(app);

// Constructing socket.io object and wire up to our HTTP server
let socketIOServer = require("socket.io")(server);

socketIOServer.on("connection", (socket) => {
  console.log("A user connected!");

  // Listening for DataSent data coming through the socket
  socket.on("dataSent", (data) => {
    console.log("Received from browser: " + data.message);

    // broadcasting the data to all the other browsers
    socket.broadcast.emit("dataReceived", data);
    // Send data back to the browser that sent it
    socket.emit("dataReceived", data);
  });

});

server.listen(process.env.PORT || 8080, () => console.log("Listening on port 8080"));
