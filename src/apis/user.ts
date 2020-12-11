import { APIS } from '../types/api'
import { RequestMethod } from '@/types/enum'
import { AxiosResponse } from 'axios'

const axios = window.axios
const urlHead = '/api/User'
const apis: APIS = {
  enumGender: {
    url: `${urlHead}/EnumGender`,
    method: RequestMethod.get
  }
}

export async function enumGender ():Promise<AxiosResponse> {
  return axios({
    url: apis.enumGender.url,
    method: apis.enumGender.method
  })
}
