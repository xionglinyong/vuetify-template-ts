<template lang="pug">
  div(:class="$style.inner")
    v-row
      v-col(cols="12" xs="12" md="3")
        v-text-field(label="message" v-model="option.message")
      v-col(cols="12" xs="12" md="3")
        v-text-field(label="icon" v-model="option.icon" placeholder="图标样式，例如：iconfont iconfont-add")
      v-col(cols="12" xs="12" md="3")
        v-text-field(label="bgColor" v-model="option.bgColor" placeholder="背景颜色，如：#fff、red")
      v-col(cols="12" xs="12" md="3")
        v-text-field(label="color" v-model="option.color" placeholder="文字颜色，如：#333、red")
      v-col(cols="12" xs="12" md="3")
        v-select(:items="borderTypes" label="border类型" v-model="borderType")
      v-col(cols="12" xs="12" md="3")
        v-text-field(
          label="border"
          v-if="borderType===borderTypes[0]"
          placeholder="边框样式，如：1px solid #333"
          v-model="option.border")
        v-select(
          :items="booleans"
          v-if="borderType===borderTypes[1]"
          placeholder="边框样式为true时默认为文字颜色"
          label="border"
          v-model="option.border")
      v-col(cols="12" xs="12" md="3")
        v-select(
          :items="booleans"
          label="close"
          v-model="option.close")
      v-col(cols="12" xs="12" md="3")
        v-select(
          :items="positions"
          label="position"
          v-model="option.position")
      v-col(cols="12" xs="12" md="3")
        v-select(
          :items="booleans"
          label="round"
          v-model="option.round")
      v-col(cols="12" xs="12" md="3")
        v-text-field(label="wait" type="number" v-model="option.wait")
      v-col(cols="12" xs="12" md="3")
        v-text-field(label="height" placeholder="高度，如：100px" v-model="option.height")
      v-col(cols="12" xs="12" md="3")
        v-text-field(label="width" placeholder="宽度，如：100px" v-model="option.width")
      v-col(cols="12" xs="12" md="3")
        v-btn(@click.native="trigger" width="100%" color="secondary") 触发
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ToastOption, ToastVNode } from '@/plugins/toast'

@Component({})
export default class Home extends Vue {
  borderType='boolean'
  booleans=[true, false]
  borderTypes=['string', 'boolean']
  positions=['top', 'center', 'bottom']
  toastVNode:ToastVNode|null=null
  option: ToastOption = {
    bgColor: '#fff',
    border: true,
    close: false,
    color: '#333',
    height: '',
    icon: '',
    message: 'message',
    position: 'top',
    round: false,
    wait: 3000,
    width: ''
  }

  trigger ():void {
    this.$toast(this.option)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" module>
.inner
  width 100%
  height: 100%;
  overflow  hidden auto
</style>
