import { Hono } from "hono";
// import { authGuard } from "../../../auth/guard/auth-guard.ts";
import { putStatesController } from "../controllers/put-states.controller.js";
import { getStatesController } from "../controllers/get-states.controller.js";
import { deleteStateController } from "../controllers/delete-state.controller.js";
import { startController } from "../controllers/start.controller.js";
import { upgradeWebSocket } from "hono/cloudflare-workers";

export const agentRoute = new Hono();

agentRoute.get(
  "/states",
  // authGuard({ permissions: [], checkQuota: [] }),
  getStatesController,
);
agentRoute.put(
  "/states",
  // authGuard({ permissions: [], checkQuota: [] }),
  putStatesController,
);
agentRoute.delete(
  "/states",
  // authGuard({ permissions: [], checkQuota: [] }),
  deleteStateController,
);
agentRoute.get(
  "/start",
  // authGuard({ permissions: [], checkQuota: [] }), TODO: verificar compatibilidade com websockets
  upgradeWebSocket((c) => {
    return {
      async onMessage(event, ws) {
        await startController(c, ws, event.data)
      },
      onClose(event, ws) {
        console.log("Connection closed");
      },
      onError(error, ws) {
        console.error("WebSocket error: ", error);
      }
    }
  })
);