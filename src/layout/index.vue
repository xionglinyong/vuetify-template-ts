<template lang="pug">
  v-app(:class="$style.layout")
    v-navigation-drawer(
      v-model="drawerVisible"
      class="indigo accent-2"
      width="160"
      dark
      app
      clipped)
      v-list(dense nav)
        template(v-for="(menu,index) in menus")
          template(v-if="menu.name!=='404' && (!menu.children || menu.children.length===0)")
            v-list-item(
              link
              :exact-active-class="$style.menuActive"
              :to="menu.path"
              :key="menu.meta.title")
              v-list-item-icon
                v-icon {{ menu.meta.icon }}
              v-list-item-content
                v-list-item-title {{ menu.meta.title }}
          template(v-if="menu.name!=='404' && (menu.children && menu.children.length>0)")
            v-menu(top :offset-x="true" transition="fab-transition")
              template(v-slot:activator="{ on, attrs }")
                v-list-item(
                  v-bind="attrs"
                  v-on="on"
                  link
                  :class="{[$style.menuActive]:$route.path.includes(menu.path)}"
                  @click="selectMenuIndex=index"
                  :key="menu.meta.title")
                  v-list-item-icon
                    v-icon {{ menu.meta.icon }}
                  v-list-item-content
                    v-list-item-title {{ menu.meta.title }}
              v-list
                v-list-item(
                  :exact-active-class="$style.menuActive"
                  :to="item.path"
                  v-for="(item, index) in childrenMenus"
                  :key="index")
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
      v-btn(icon)
        v-icon mdi-account
      v-btn(icon)
        v-icon iconfont icon-theme
      v-menu(top)
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
    v-main(:class="$style.main")
      v-container(class="fill-height" :class="$style.routerInner")
        transition(
          name="rv-fade"
          mode="out-in")
          keep-alive
            router-view(:class="$style.routerView")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Menus } from '@/types/permission'
import Permission from '@/store/modules/permission'
import { getModule } from 'vuex-module-decorators'

let permission: Permission

@Component({})
export default class Layout extends Vue {
  activeIndex = '/company'
  drawerVisible = true
  selectMenuIndex = 0
  menus: Array<Menus> = []

  get childrenMenus (): Array<{
    title: string;
    path: string;
    isActive: boolean;
  }> {
    const parentMenu = this.menus[this.selectMenuIndex]
    const menus: Array<Menus> = parentMenu?.children ?? []
    return menus.map((menu: Menus) => ({
      path: `${parentMenu?.path}/${menu.path}`,
      title: menu.meta?.title ?? '',
      isActive: false
    }))
  }

  mounted (): void {
    permission = getModule(Permission, this.$store)
    this.menus = permission.menu
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
  overflow hidden
  .menuActive
    background rgba(48, 71, 220, 0.4)
  .main
    overflow hidden
    width 100%
    height 100%
    &>div
      overflow hidden
    .routerInner
      transform-style preserve-3d
      perspective 500px
      overflow hidden
      width 100%
</style>
