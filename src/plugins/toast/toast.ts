import { VueConstructor } from 'vue'
import Toast from '@/plugins/toast/toast.tsx'
import { ToastOption, ToastVNode } from '@/plugins/toast/index'

let instance: ToastVNode | null = null

function install (Vue: VueConstructor) {
  function toast (data: ToastOption) {
    if (instance) {
      instance.closeToast()
    }
    const constructor: VueConstructor = Vue.extend(Toast)
    const toastVNode = new constructor({
      data
    })
    toastVNode.$mount()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance = toastVNode
    document.body.appendChild(toastVNode.$el)

    return toastVNode
  }

  Vue.prototype.$toast = toast
}

export default {
  install
}
