import { shallowMount } from '@vue/test-utils'
import Toast from '@/plugins/toast/toast.tsx'
import { Vue } from 'vue-property-decorator'
import { ToastOption } from '@/plugins/toast'

describe('Toast组件功能测试', () => {
  it('默认值测试', async function () {
    const message = '挂载的内容'
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message
        }
      }
    })
    await Vue.nextTick()
    expect(toastWrapper.find('.content').text()).toBe(message)
    expect(toastWrapper.find('.close')).toBeDefined()
  })

  it('顶部位置', async function () {
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message: '',
          position: 'top'
        }
      }
    })
    await toastWrapper.vm.$nextTick()
    expect(toastWrapper.find('.toast .top')).toBeDefined()
  })

  it('居中位置', async function () {
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message: '测试内容',
          position: 'center'
        }
      }
    })
    await Vue.nextTick()
    expect(toastWrapper.find('.toast .center')).toBeDefined()
  })

  it('底部位置', async function () {
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message: '底部位置测试',
          position: 'bottom'
        }
      }
    })
    expect(toastWrapper.find('.toast .bottom')).toBeDefined()
  })

  it('持续时间', async function () {
    const wait = 3000
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message: '持续时间测试',
          wait
        }
      }
    })
    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, wait)
    })
    expect(toastWrapper.text()).toBe('')
  })

  it('圆角', async function () {
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message: '圆角测试',
          round: true
        }
      }
    })
    expect(toastWrapper.find('.toast .round')).toBeDefined()
  })

  it('显示关闭按钮', function () {
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message: '显示关闭按钮',
          close: true
        }
      }
    })
    expect(toastWrapper.find('.close')).toBeDefined()
  })

  it('不显示关闭', function () {
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message: '不显示关闭',
          close: false
        }
      }
    })
    expect(toastWrapper.html().includes('.close')).toBe(false)
  })

  it('颜色与背景色', async function () {
    const color = 'red'
    const bgColor = 'blue'
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message: '颜色与背景',
          color,
          bgColor
        }
      }
    })
    await Vue.nextTick()
    const toastEle = toastWrapper.find('.toast').element
    expect(toastEle.style.color).toBe(color)
    expect(toastEle.style.background).toBe(bgColor)
  })

  it('宽高', async function () {
    const width = '300px'
    const height = '100px'
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message: '宽高',
          width,
          height
        }
      }
    })
    await Vue.nextTick()
    const toastEle = toastWrapper.find('.toast').element
    expect(toastEle.style.width).toBe(width)
    expect(toastEle.style.height).toBe(height)
  })

  it('关闭', async function () {
    const toastWrapper = shallowMount(Toast, {
      data (): ToastOption {
        return {
          message: '关闭功能'
        }
      }
    })
    await Vue.nextTick()
    toastWrapper.vm.closeToast()
    await Vue.nextTick()
    expect(toastWrapper.text()).toBe('')
  })
})
