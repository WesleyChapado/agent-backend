import { WSContext } from "hono/ws";

export const nodeOutputResultService = async (
  outputs: any[],
  processedContent: any,
  ws: WSContext,
) => {
  for (const output of outputs) {
    if (output.type !== "output") {
      ws.send("Invalid output type");
      console.error("Invalid output type");
      ws.close();
      return null;
    }

    if (output.data.format === "text") {
      ws.send("Outputting text: " + processedContent);
      console.log("Outputting text: " + processedContent);
      continue;
    }

    ws.send("Invalid output format");
    console.error("Invalid output format");
    ws.close();
    return null;
  }
};
