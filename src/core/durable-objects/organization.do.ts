import { DurableObject } from 'cloudflare:workers'
import { PutStatesDTO } from '../../features/agent/dto/put-state.dto'
import { DeleteStateDTO } from '../../features/agent/dto/delete-state.dto'

export class OrganizationDO extends DurableObject {
  async getStates() {
    let value = (await this.ctx.storage.get('value')) || []
    return value
  }

  async putStates(validatedData: PutStatesDTO) {
    await this.ctx.storage.put('value', validatedData.states)
    return validatedData.states
  }

  async deleteState(validatedData: DeleteStateDTO) {
    let value: Array<any> = (await this.ctx.storage.get('value')) || []
    value = value.filter((item) => item.version !== validatedData.version)
    await this.ctx.storage.put('value', value)
    return value
  }
}
