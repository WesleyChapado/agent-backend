import { Context } from "hono";

export const startController = async (c: Context, ws: any, message: any) => {
  const jsonMessage = JSON.parse(message)
  console.log(`Message from client: ${jsonMessage}`)
  ws.send(`Received: ${message}`)
}