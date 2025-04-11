import { WSContext } from "hono/ws"

export const nodeProcessingResultService = async (processings: any[], inputsExtractedContents: any[], ws: WSContext) => {
  let inputsProcessedContents: any[] = []

  for (const processing of processings) {
    if (processing.type !== "processing") {
      ws.send("Invalid processing type")
      console.error("Invalid processing type")
      ws.close()
      return null
    }

    for (const input of inputsExtractedContents) {
      if (processing.data.format === "convert_text") {
        ws.send("Converting text: " + input.data.content)
        console.log("Converting text: " + input.data.content)
        const processedContent = convertTextService(input.data.content)
        input.data.content = processedContent
        inputsProcessedContents.push(input)
        continue
      }

      ws.send("Invalid processing format")
      console.error("Invalid processing format")
      ws.close()
      return null
    }
  }

  return inputsProcessedContents
}

export const convertTextService = (rawContent: any) => {
  return rawContent.toUpperCase()
}
