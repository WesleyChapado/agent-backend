import { Hono } from 'hono'
import { OrganizationDO } from './src/core/durable-objects/organization.do'
import { agentRoute } from './src/features/agent/routes/agent.routes'
import { cors } from 'hono/cors'

type Env = {
  Bindings: {
    ORGANIZATION_DO: DurableObjectNamespace<OrganizationDO>
  }
}

const app = new Hono<Env>()

app.use("/*", cors({
  origin: '*'
}));

app.route('/agent', agentRoute)

export { OrganizationDO }

export default app