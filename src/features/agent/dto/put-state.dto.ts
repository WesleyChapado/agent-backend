import z from "zod";

export const putStatesDTO = z.object({
  states: z.array(
    z.object({
      version: z.number(),
    }).passthrough(),
  ),
})
  .strict();

export type PutStatesDTO = z.infer<typeof putStatesDTO>;
