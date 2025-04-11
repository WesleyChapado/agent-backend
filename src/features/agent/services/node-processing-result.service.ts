import { WSContext } from "hono/ws";

export const nodeProcessingResultService = async (
  processings: any[],
  inputsExtractedContents: any[],
  ws: WSContext,
) => {
  let concatenatedInputsExtractedContents = inputsExtractedContents.map(
    (input) => input.data.content
  ).join("\n");
  let lastProcessingResult: any = null;

  for (const processing of processings) {
    if (processing.type !== "processing") {
      ws.send("Invalid processing type");
      console.error("Invalid processing type");
      ws.close();
      return null;
    }

    if (lastProcessingResult === null) {
      lastProcessingResult = concatenatedInputsExtractedContents;
    }

    if (processing.data.format === "convert_text") {
      ws.send("Converting text...");
      console.log("Converting text: " + lastProcessingResult);
      const processedContent = convertTextService(lastProcessingResult);
      lastProcessingResult = processedContent;
      continue;
    }

    // if (processing.data.format === "create_poem") {
    //   ws.send("Creating poem...");
    //   console.log("Creating poem: " + lastProcessingResult);
    //   const processedContent = await createPoemService(lastProcessingResult);
    //   lastProcessingResult = processedContent;
    //   continue;
    // }

    ws.send("Invalid processing format");
    console.error("Invalid processing format");
    ws.close();
    return null;
  }

  return lastProcessingResult;
};

export const convertTextService = (rawContent: any) => {
  return rawContent.toUpperCase();
};

// export const createPoemService = async (text: any) => {
//   const prompt = `Crie um poema com o seguinte texto: ${text}`;
//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     }),
//   });

//   const data = await response.json() as {
//     choices: Array<{ message: { content: string } }>;
//   };
//   return { completion: data.choices[0]?.message.content };
// };
