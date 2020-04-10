import Vue from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Element, { Loading, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { MessageType } from '@/interface/enum'

Vue.use(Element)
Vue.use(Loading)

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window.tips = function (message = '操作成功', type: MessageType = MessageType.success) {
  Message({
    message,
    type,
    showClose: true
  })
}
