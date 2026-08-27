# TV signaling server

`src/index.js` is a Cloudflare Worker + Durable Object WebSocket relay for My Living World TV rooms.

## Deploy

From this directory:

```bash
npx wrangler deploy
```

Then set the web app environment variable:

```text
VITE_TV_WS_URL=wss://<your-worker-domain>/room
```

The browser transport will connect to `<VITE_TV_WS_URL>/<sessionId>`.

The Durable Object uses the WebSocket Hibernation API so an idle room can hibernate while keeping connected WebSockets alive.
