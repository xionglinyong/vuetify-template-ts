import Vue from 'vue'
import {
  Button,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem, Icon,
  Input,
  Loading,
  Menu,
  MenuItem,
  Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { MessageType } from '@/interface/enum'

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Icon)
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
