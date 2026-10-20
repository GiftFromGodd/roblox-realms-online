const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve the game's files from this project's root folder.
app.use(express.static(__dirname));
app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.listen(PORT, "0.0.0.0", () => console.log(`Robux Realms listening on ${PORT}`));
