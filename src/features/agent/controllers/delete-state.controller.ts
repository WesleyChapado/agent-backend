import { Context } from "hono";
import { deleteStateDTO } from "../dto/delete-state.dto";

export const deleteStateController = async (c: Context) => {
  const organization_id = "12345"
  const version = c.req.query("version")

  const dtoResult = deleteStateDTO.safeParse({ version: Number(version) });

  if (!dtoResult.success) {
    return c.json({ message: dtoResult.error.format() }, 400);
  }

  const validatedData = dtoResult.data;

  const id = c.env.ORGANIZATION_DO.idFromName(organization_id)
  const organization_do = c.env.ORGANIZATION_DO.get(id)

  const states = await organization_do.deleteState(validatedData)

  return c.json({ message: "State deleted successfully", states }, 200)
}