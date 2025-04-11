import { Context } from "hono";
import { WSContext } from "hono/ws";

export const startController = async (c: Context, ws: WSContext, message: string) => {
  try{
    const jsonMessage = JSON.parse(message)
    console.log("Message from client: ", message)
    ws.send("Starting agent...")
  } catch (error) {
    const errorMessage = `Message not a valid JSON: ${message}`
    console.error(errorMessage)
    ws.send(errorMessage)
    return
  }
}