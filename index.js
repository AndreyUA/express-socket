const express = require("express");
const WebSocket = require("ws");

const app = express();

const server = require("http").createServer(app);

const wss = new ws.Server({ server });

wss.on("connection", function connection(ws) {
  console.log("a new client connected!");
  ws.send("wellcome new client");

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.get("/", (req, res) => res.send("hello world"));

server.listen(3000, () => console.log("listening on port 3000"));
