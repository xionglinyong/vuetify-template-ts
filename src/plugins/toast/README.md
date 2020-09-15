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
| message | string | 无 | toast内容 | ✅ |
| icon | string | '' | icon样式，例如：iconfont iconfont-add" | ❎ |
| close | boolean | true | 是否显示关闭 | ❎ |
| wait | number | 3000 | toast持续时间 | ❎ |
| close | 'top'、'center'、'bottom' | 'top' | 位置 | ❎ |
| round | boolean | false | 是否圆角 | ❎ |
| color | string | '#333' | 文字颜色 | ❎ |
| bgColor | string | '#fff' | 背景颜色 | ❎ |
| width | string | '' | 宽度，如：200px | ❎ |
| height | string | '' | 高度，如：200px | ❎ |
| border | boolean/string | false | 边框，如：1px solid #333 | ❎ |
### 实例方法
closeToast():void
描述：关闭并销毁Toast
