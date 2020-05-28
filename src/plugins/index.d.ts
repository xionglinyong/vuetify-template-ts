import Vue, { VueConstructor } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AxiosInstance } from 'axios'
import { MessageType } from '@/interface/enum'

declare global {
  interface Window {
    axios: AxiosInstance;
  }
  function tips(message: string, type: MessageType): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
  interface VueConstructor {
    $axios: AxiosInstance;
  }
}
