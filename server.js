const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static("."));
app.get("/health", (_req, res) => res.json({ ok: true, game: "Robux Realms" }));

const players = new Map();
io.on("connection", socket => {
  players.set(socket.id, {
    id: socket.id,
    name: "Player",
    x: Math.random() * 8 - 4,
    z: Math.random() * 8 - 4,
    color: ["#ff6b6b", "#4dabf7", "#ffd43b", "#69db7c", "#da77f2"][Math.floor(Math.random()*5)],
    coins: 0
  });
  socket.emit("welcome", { id: socket.id, players: [...players.values()] });
  socket.broadcast.emit("playerJoined", players.get(socket.id));

  socket.on("move", data => {
    const p = players.get(socket.id);
    if (!p || !data) return;
    p.x = Math.max(-42, Math.min(42, Number(data.x) || 0));
    p.z = Math.max(-42, Math.min(42, Number(data.z) || 0));
    io.emit("playerMoved", { id: socket.id, x: p.x, z: p.z });
  });
  socket.on("setName", name => {
    const p = players.get(socket.id);
    if (p) {
      p.name = String(name || "Player").slice(0, 16);
      io.emit("playerUpdated", p);
    }
  });
  socket.on("coin", () => {
    const p = players.get(socket.id);
    if (p) { p.coins += 1; io.emit("playerUpdated", p); }
  });
  socket.on("disconnect", () => {
    players.delete(socket.id);
    io.emit("playerLeft", socket.id);
  });
});

server.listen(PORT, "0.0.0.0", () => console.log(`Robux Realms running on ${PORT}`));
