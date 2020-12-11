import { APIS } from '@/types/api'
import { RequestMethod } from '@/types/enum'

const urlHead = '/api/Authorize'
const apis: APIS = {
  login: {
    url: `${urlHead}/Login`,
    method: RequestMethod.post
  }
}
