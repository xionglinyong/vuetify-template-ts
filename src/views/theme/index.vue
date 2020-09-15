<template lang="pug">
  div(:class="$style.themeInner")
    v-btn(
      v-for="(color,index)  of colors"
      :key="index"
      :color="color") {{color}}
    v-btn 换肤
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SystemConfig from '@/store/modules/conf'
import { getModule } from 'vuex-module-decorators'

const config:SystemConfig = getModule(SystemConfig)

@Component
export default class Map extends Vue {
  colors: Array<string> = [
    'primary',
    'secondary',
    'accent',
    'error',
    'info',
    'success'
  ]

  mounted () {
    this.$vuetify.theme.themes.light = config.themes.chineseDark
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" module>
.themeInner
  &>button
    margin-right 10px
</style>
