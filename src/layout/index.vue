<template>
  <div :class="$style.layout">
    <Nav :class="$style.nav" />
    <el-menu
      :default-active.sync="activeIndex"
      router
      :class="$style.menu"
      class="el-menu-vertical-demo"
      v-if="menus"
    >
      <template
        v-for="menu of menus"
      >
        <el-submenu
          :key="menu.name"
          :index="menu.path"
          v-if="menu.children && menu.children.length"
        >
          <template slot="title">
            <i :class="menu.meta.icon" />
            <span>{{ menu.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="children of menu.children"
            :index="`${menu.path}/${children.path}`"
            :key="children.name"
          >
            <i
              :class="children.meta.icon"
              v-if="children.meta.icon"
            />
            <span slot="title">{{ children.meta.title }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="menu.path"
          :key="menu.name"
        >
          <i :class="menu.meta.icon" />
          <span slot="title">{{ menu.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <div :class="$style.routerViewInner">
      <transition
        name="rv-fade"
        mode="out-in"
      >
        <router-view :class="$style.routerView" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Nav from '@/layout/nav.vue'
import { Getter } from 'vuex-class'
import { Menus } from '@/interface/permission'

interface MenuItem{
  to: string;
  title: string;
  icon: string;
}

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
    grid-template-rows 61px auto
    perspective 800px

    .nav
      grid-column 1 / span 2

    .menu
      user-select none
      background #246BB3

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
