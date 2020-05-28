import {RequestMethod} from '@/interface/enum'

interface API {
  url: string;
  method: RequestMethod;
}

export interface APIS {
  [nanme: string]: API;
}
