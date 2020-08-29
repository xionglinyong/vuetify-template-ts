# Toast插件
## 使用
### 全局引入插件
```typescript
import Toast from '@/plugins/toast/toast'
import '@/plugins/toast/toast.styl'

Vue.use(Toast)
```
###局部引入插件
```typescript
this.use(Toas)
```
#### 使用插件
```typescript
this.$toast({
  message,
  wait: 4000
})
```
## 更多
### $taost()
$toast默认返回Toast的Vue实例，可以接收返回值来操作Toast实例：
```typescript
const toastVNode:ToastInstance = this.$toast({
  message,
  wait: 4000
})
console.log(toastVNode.$data)
```
### 参数
| 名称 | 类型 | 默认值 | 描述 | 是否必须 |
| :-----:| :----: | :----: | :----: | :----: |
| message | string | false | toast内容 | ✅ |
| icon | string | 0 | icon样式 | ❎ |
| close | boolean | '' | 是否显示关闭 | ❎ |
| wait | number | '' | toast持续时间 | ❎ |
| position | 'top'、'center'、'bottom' | true | 位置 | ❎ |
| round | boolean | 3000 | 是否圆角 | ❎ |
| color | string | 'top' | 文字颜色 | ❎ |
| bgColor | string | false | 背景颜色 | ❎ |
| width | string | '#333' | 宽度 | ❎ |
| height | string | '#fff' | 高度 | ❎ |
| border | boolean/string | false | 边框 | ❎ |
### 实例方法
closeToast():void
