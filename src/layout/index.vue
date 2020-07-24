<template lang="pug">
  v-app
    v-navigation-drawer(
      v-model="drawerVisible"
      class="indigo accent-2"
      width="160"
      dark
      app
      clipped)
      v-list(dense nav)
        template(v-for="menu in menus")
          template(v-if="menu.name!=='404' && (!menu.children || menu.children.length===0)")
            v-list-item(link :key="menu.meta.title")
              v-list-item-icon
                v-icon {{ menu.meta.icon }}
              v-list-item-content
                v-list-item-title {{ menu.meta.title }}
          template(v-if="menu.name!=='404' && (menu.children && menu.children.length>0)")
            v-menu(top :offset-x="offset")
              template v-slot:activator="{ on, attrs }"
                v-btn(
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on") Dropdown
              v-list
                v-list-item(
                  v-for="(item, index) in items"
                  :key="index"
                  @click="")
                  v-list-item-title {{ item.title }}
    v-app-bar(
      color="indigo darken-2"
      app
      clipped-left
      dense
      dark)
      v-app-bar-nav-icon(@click.stop="drawerVisible=!drawerVisible")
      v-toolbar-title 系统名
      v-spacer
      v-btn(icon)
        v-icon mdi-heart
      v-btn(icon)
        v-icon mdi-magnify
      v-menu(
        left
        bottom)
        template(v-slot:activator="{ on, attrs }")
          v-btn(
            icon
            v-bind="attrs"
            v-on="on")
            v-icon mdi-dots-vertical
        v-list
          v-list-item(
            v-for="n in 5"
            :key="n"
            @click="() => {}")
            v-list-item-title Option {{ n }}
    v-main
      v-container(class="fill-height")
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
import { Menus } from '@/types/permission'

@Component({
  components: {
    Nav
  }
})
export default class Layout extends Vue {
  activeIndex = '/company'
  drawerVisible=true
  links=[]
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
  .layout1
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
