import { WSContext } from "hono/ws"

export const nodeOutputResultService = async (output: any, inputsProcessedContents: any[], ws: WSContext) => {
  let inputsOutputContents: any[] = []

  if (output.type !== "output") {
    ws.send("Invalid output type")
    console.error("Invalid output type")
    ws.close()
    return null
  }

  for (const inputProcessedContent of inputsProcessedContents) {
    if (output.data.format === "text") {
      ws.send("Outputting text: " + inputProcessedContent.data.content)
      console.log("Outputting text: " + inputProcessedContent.data.content)
      inputsOutputContents.push(inputProcessedContent)
      continue
    }

    ws.send("Invalid output format")
    console.error("Invalid output format")
    ws.close()
    return null
  }

  return inputsOutputContents
}