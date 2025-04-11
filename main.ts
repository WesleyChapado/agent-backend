import { Hono } from 'hono'
import { OrganizationDO } from './src/core/durable-objects/organization.do'
import { agentRoute } from './src/features/agent/routes/agent.routes'

type Env = {
  Bindings: {
    ORGANIZATION_DO: DurableObjectNamespace<OrganizationDO>
  }
}

const app = new Hono<Env>()

app.route('/agent', agentRoute)

export { OrganizationDO }

export default app