<template lang="pug">
  nav(:class="$style.nav")
    h1 {{ sysName }}
    el-dropdown(
      :class="$style.dropdown"
      trigger="click"
      @command="handleClick"
    )
      span.el-dropdown-link
        |{{ userName }}
        i.el-icon-arrow-down.el-icon--right
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(command="editInfo") 企业信息修改
        el-dropdown-item(command="editPassword") 更改密码
        el-dropdown-item(command="loginOut") 退出登录
    el-dialog(
      :title="title"
      :visible.sync="visible"
      append-to-body
      @close="handleClosed")
      div(:class="$style.component")
        component(
          :is="currentComponent"
          :enterprise-id="12313")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
import { UserInfo } from '../interface/user'
import { getUserInfo } from '@/utils/auth'

const user = namespace('user')

  enum MenuCommand {
    editInfo = 'editInfo',
    editPassword = 'editPassword',
    loginOut = 'loginOut'
  }

  @Component({
    components: {}
  })
export default class Nav extends Vue {
    visible = false
    title = ''
    currentComponent = ''
    userInfo: UserInfo = getUserInfo()

    @Getter user!: UserInfo

    @user.Action('loginOut') loginOut!: ()=>void

    get sysName () {
      const str = '用户'
      return str
    }

    get userName () {
      const name = ''

      return name
    }

    handleClick (command: MenuCommand) {
      switch (command) {
        case MenuCommand.editInfo:
          this.visible = true
          this.currentComponent = 'Info'
          this.title = '修改企业信息'
          break
        case MenuCommand.editPassword:

          break
        case MenuCommand.loginOut:
          this.loginOut()
          break
      }
    }

    handleClosed () {
      this.currentComponent = ''
    }

    mounted () {
      console.log('mounted')
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" module>
  .nav
    display grid
    box-shadow 0px 1px 9px 0px #8c939d
    z-index 2
    padding 0px 100px 0px 20px
    grid-template-columns 300px auto
    color #fff
    background #3379C4

    .dropdown
      place-self center end
      cursor pointer
      color #fff

    h1
      place-self center start

  .component
    height 60vh
</style>
