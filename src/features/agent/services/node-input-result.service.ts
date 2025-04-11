import { WSContext } from "hono/ws"

export const nodeInputResultService = async (inputs: any[], ws: WSContext) => {
  let inputsExtractedContents: any[] = []

  for (const input of inputs) {
    if (input.type !== "input") {
      ws.send("Invalid input type")
      console.error("Invalid input type")
      ws.close()
      return null
    }

    if (input.data.format === "text") {
      ws.send("Extracting text: " + input.data.content)
      console.log("Extracting text: " + input.data.content)
      const extractedContent = extractTextService(input)
      input.data.content = extractedContent
      inputsExtractedContents.push(input)
      continue
    }

    ws.send("Invalid input format")
    console.error("Invalid input format")
    ws.close()
    return null
  }

  return inputsExtractedContents
}

export const extractTextService = (input: any) => {
  return input.data.content
}
