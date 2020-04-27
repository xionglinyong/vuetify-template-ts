interface API {
  url: string;
  method: string;
}

export interface APIS {
  [nanme: string]: API;
}
