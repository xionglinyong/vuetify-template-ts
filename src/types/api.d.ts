import { RequestMethod } from '@/types/enum'

interface Api {
  url: string;
  method: RequestMethod;
}

export interface APIS {
  [nanme: string]: Api;
}
