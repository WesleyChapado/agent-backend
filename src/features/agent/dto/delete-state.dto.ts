import z from "zod";

export const deleteStateDTO = z.object({
  version: z.number(),
}).strict();

export type DeleteStateDTO = z.infer<typeof deleteStateDTO>;
