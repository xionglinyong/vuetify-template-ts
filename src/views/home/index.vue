<template lang="pug">
  div(:class="$style.inner")
    div#map
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Direction } from '@/interface/enum'

@Component({
})
export default class Home extends Vue {
  direction: Direction = Direction.center
  aMap: any = null

  initMap () {
    // this.aMap = new AMap.Map('map', {
    //   resizeEnable: true, // 是否监控地图容器尺寸变化
    //   mapStyle: 'amap://styles/3f74bb437d3ea4f3304969feecea9cd5',
    //   zoom: 11 // 初始化地图层级
    // })
  }

  async mounted () {
    this.initMap()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" module>
  .inner
    width 100%
    height: 100%;
</style>
