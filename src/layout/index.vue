<template lang="pug">
  div(:class="$style.layout")
    Nav(:class="$style.nav")
    el-menu(
      :default-active.sync="activeIndex"
      router
      background-color="#3379c4"
      :class="$style.menu"
      text-color="#fff"
      active-text-color="#409EFF"
      class="el-menu-vertical-demo"
      v-if="menus")
      template(v-for="menu of menus")
        el-submenu(
          :key="menu.name"
          :index="menu.path"
          v-if="menu.children && menu.children.length" )
          template(slot="title")
            i(:class="menu.meta.icon")
            span {{ menu.meta.title }}
          el-menu-item(
            v-for="children of menu.children"
            :index="`${menu.path}/${children.path}`"
            :key="children.name")
            i(
              :class="children.meta.icon"
              v-if="children.meta.icon")
            span(slot="title") {{ children.meta.title }}
          </el-menu-item>
        el-menu-item(
          v-else-if="menu.name!=='404'"
          :index="menu.path"
          :key="menu.name")
          i(:class="menu.meta.icon")
          <span slot="title">{{ menu.meta.title }}</span>
        </el-menu-item>
    div(:class="$style.routerViewInner")
      transition(
        name="rv-fade"
        mode="out-in")
        keep-alive
          router-view(:class="$style.routerView")
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Nav from '@/layout/nav.vue'
import { Getter } from 'vuex-class'
import { Menus } from '@/interface/permission'

@Component({
  components: {
    Nav
  }
})
export default class Layout extends Vue {
  activeIndex = '/company'
  @Getter('menu') menus!: Array<Menus>

  mounted () {
    this.activeIndex = this.$route.path
  }

  @Watch('$route', { deep: true })
  onRouteChange (value: any) {
    this.activeIndex = value.path
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .rv-fade-enter-active, .rv-fade-leave-active
    transform-origin center

  .rv-fade-enter-active
    animation rvIn .5s

  .rv-fade-leave-active
    animation rvOut .5s

  @keyframes rvOut
    0%
      opacity 1
      transform translate3d(0px, 0px, 0px) rotateY(0deg)
    50%
      opacity 1
      transform translate3d(30px, 0px, -78px) rotateY(6deg)
    100%
      opacity 0
      transform translate3d(-165px, 0px, -150px) rotateY(12deg)

  @keyframes rvIn
    0%
      opacity 0
      transform translate3d(200px, 0px, 200px) rotateY(12deg)
    50%
      opacity 1
      transform translate3d(50px, 0px, -50px) rotateY(6deg)
    100%
      opacity 1
      transform translate3d(0px, 0px, 0px) rotateY(0deg)
</style>
<style lang="stylus" rel="stylesheet/stylus" module>
  .layout
    width 100%
    height 100%
    display grid
    grid-template-columns 150px auto
    grid-template-rows 66px auto
    perspective 800px

    .nav
      grid-column 1 / span 2

    .menu
      user-select none
      width 100%
      overflow hidden auto

    .routerViewInner
      position: relative;
      background #fff

      .routerView
        position: absolute;
        top 0
        left 0
        width 100%
        height 100%
        padding 20px
        box-sizing border-box
        overflow hidden auto
        transition all .5s
</style>
