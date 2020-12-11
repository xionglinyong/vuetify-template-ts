import { AxiosInstance } from 'axios'
import { MessageType } from '@/types/enum'

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
