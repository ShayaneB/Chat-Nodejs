// import path from "path";
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const { createServer } = require("node:http");

const server = createServer(app);
const io = new Server(server);

// app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "././views")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.render("index", { Message: "" });
  res.sendFile(path.join(__dirname, "././views", "index.html"));
});

app.post("/", function (req, res) {
  const message = req.body.message;
  if (message) {
    res.render("index", { Message: req.body.message });
  } else {
    res.send("Message not send!");
  }
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, function () {
  console.log("Server listing on 3000");
});
