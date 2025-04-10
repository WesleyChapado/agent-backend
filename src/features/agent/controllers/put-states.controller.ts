import { Context } from "hono";
import { putStatesDTO } from "../dto/put-state.dto";

export const putStatesController = async (c: Context) => {
  const organization_id = "12345" // TODO: pegar do guard.
  const body_request = await c.req.json();

  const dtoResult = putStatesDTO.safeParse(body_request);

  if (!dtoResult.success) {
    return c.json({ message: dtoResult.error.format() }, 400);
  }

  const validatedData = dtoResult.data;

  const id = c.env.ORGANIZATION_DO.idFromName(organization_id)
  const organization_do = c.env.ORGANIZATION_DO.get(id)

  const states = await organization_do.putStates(validatedData)

  return c.json({ message: "States updated successfully", states }, 200)
}