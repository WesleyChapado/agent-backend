import { Context } from "hono";
import { WSContext } from "hono/ws";
import { nodeInputResultService } from "../services/node-input-result.service";
import { nodeProcessingResultService } from "../services/node-processing-result.service";
import { nodeOutputResultService } from "../services/node-output-result.service";

export const startController = async (
  c: Context,
  ws: WSContext,
  message: string,
) => {
  let jsonMessage;

  try {
    jsonMessage = JSON.parse(message);
    console.log("Message from client: ", message);
    ws.send("Starting agent...");
  } catch (error) {
    const errorMessage = `Message not a valid JSON: ${message}`;
    console.error(errorMessage);
    ws.send(errorMessage);
    return;
  }

  for (const result of jsonMessage.results) {
    const inputsExtractedContents = await nodeInputResultService(result.inputs, ws);
    if (!inputsExtractedContents || inputsExtractedContents.length === 0) return;

    const processedContent = await nodeProcessingResultService(result.processings, inputsExtractedContents, ws);
    if (!processedContent || processedContent.length === 0) return;

    await nodeOutputResultService(result.outputs, processedContent, ws)

    ws.send("Agent finished");
  }
};
