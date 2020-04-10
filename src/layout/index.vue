<template>
  <div :class="$style.layout">
    <Nav :class="$style.nav"/>
    <el-menu
      :default-active.sync="activeIndex"
      router
      :class="$style.menu"
      class="el-menu-vertical-demo">
      <el-menu-item index="/index" v-if="user.role.includes('SuperAdmin') || user.role.includes('执法人员')">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/company" v-if="user.role.includes('企业')">
        <i class="el-icon-user"></i>
        <span slot="title">我的企业</span>
      </el-menu-item>
      <el-menu-item index="/receipt" v-if="user.role.includes('企业') || user.role.includes('SuperAdmin')">
        <i class="el-icon-search"></i>
        <span slot="title">回执查询</span>
      </el-menu-item>
      <el-menu-item index="/input" v-if="user.role.includes('企业')">
        <i class="el-icon-tickets"></i>
        <span slot="title">豁免登记</span>
      </el-menu-item>
      <el-menu-item index="/userManage" v-if="user.role.includes('SuperAdmin')">
        <i class="el-icon-s-custom"></i>
        <span slot="title">人员管理</span>
      </el-menu-item>
      <el-menu-item index="/check" v-if="user.role.includes('执法人员')">
        <i class="el-icon-s-check"></i>
        <span slot="title">豁免核实</span>
      </el-menu-item>
    </el-menu>
    <div :class="$style.routerViewInner">
      <transition name="rv-fade" mode="out-in">
        <router-view :class="$style.routerView"/>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Nav from '@/layout/nav.vue'
import { Getter } from 'vuex-class'
import { UserInfo } from '@/interface/user'

@Component({
  components: {
    Nav
  }
})
export default class Layout extends Vue {
  @Getter user!: UserInfo
  activeIndex='/company'
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
  .rv-fade-enter-active,.rv-fade-leave-active
    transform-origin center
  .rv-fade-enter-active
    animation rvIn .5s
  .rv-fade-leave-active
    animation rvOut .5s
  @keyframes rvOut
    0%
      opacity 1
      transform translate3d(0px,0px,0px) rotateY(0deg)
    50%
      opacity 1
      transform translate3d(30px,0px,-78px) rotateY(6deg)
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
    grid-column 1/span 2
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
