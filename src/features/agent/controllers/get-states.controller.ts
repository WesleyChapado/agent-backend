import { Context } from "hono";

export const getStatesController = async (c: Context) => {
  const organization_id = "12345";

  const id = c.env.ORGANIZATION_DO.idFromName(organization_id);
  const organization_do = c.env.ORGANIZATION_DO.get(id);

  const states = await organization_do.getStates();
  const lastState = states[states.length - 1];

  return c.json({
    message: "States fetched successfully",
    "states": lastState,//TODO: pegando o último state até o front aceitar o array inteiro
  }, 200);
};
