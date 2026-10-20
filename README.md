# Robux Realms (Replit starter)

A colorful third-person blocky adventure prototype with a simple Express + Socket.IO server.

## Run in Replit
1. Create a new **Node.js** Repl (if the option is available).
2. Upload the files from this ZIP, keeping `public/index.html` inside the `public` folder.
3. Replit should install dependencies from `package.json`. If it doesn't, open the Shell and run `npm install`.
4. Press **Run**. The server uses `process.env.PORT` automatically.
5. Open the web preview. Use the preview's share/deployment options to create a public link if your Replit account offers them.

## Controls
WASD / arrow keys to move, drag the mouse to rotate the third-person camera, Space to hop.
Walk over the gold squares to collect R-Coins.

## Prototype notes
- R-Coins are fictional game currency, not Robux.
- Players can see other connected players and their movement.
- The coin-flip mini-game is a demo and uses client-side coin counts.
- The trading button is a demo offer, not a secure transfer. Do not treat this prototype as a secure economy.
- For a real public game economy, coin balances, game outcomes, and trades must be validated and saved on the server.
- Three.js is loaded from a CDN, so that domain must be accessible on the network.
