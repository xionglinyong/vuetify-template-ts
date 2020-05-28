import Vue from 'vue'
import {
  Button,
  ButtonGroup, DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Icon,
  Input,
  Loading,
  Menu,
  MenuItem,
  Message,
  Option,
  Pagination,
  Select,
  Submenu,
  Table,
  TableColumn, TimePicker
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { MessageType } from '@/interface/enum'

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Select)
Vue.use(Option)
Vue.use(ButtonGroup)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Loading)

window.tips = function (
  message = '操作成功',
  type: MessageType = MessageType.success
) {
  Message({
    message,
    type,
    showClose: true
  })
}
