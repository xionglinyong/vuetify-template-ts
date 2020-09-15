<template lang="pug">
  v-app
    v-main
      v-container
        div(:class="$style.loginPage")
          h1 通用后台模板
          v-form(
            ref="form"
            :v-model="true"
            :lazy-validation="false")
            v-text-field(
              v-model="user.LoginName"
              :counter="20"
              outlined
              clearable
              :rules="loginNameRules"
              label="用户名"
              required
              prepend-icon="mdi-account")
            v-text-field(
              v-model="user.PassWord"
              :counter="20"
              outlined
              clearable
              :rules="passwordRules"
              label="密码"
              required
              type="password"
              prepend-icon="mdi-lock")
            v-btn(
              color="primary"
              :loading="loading"
              append-icon="close"
              @click="handleLogin") 登录
            div(:class="$style.reg")
              a() 注册
              a() 忘记密码
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import { LoginUser } from '@/types/user'
import User from '@/store/modules/user'
import { getModule } from 'vuex-module-decorators'

const user:User = getModule(User)

@Component({
  components: {
  }
})
export default class Login extends Vue {
  loginNameRules= [
    (v:string) => !!v || '请输入用户名',
    (v:string) => (v && v.length <= 20) || '用户名必须是20位以内'
  ]

  passwordRules= [
    (v:string) => !!v || '请输入密码',
    (v:string) => (v && v.length <= 20) || '用户名必须是20位以内'
  ]

  user: LoginUser={
    LoginName: '',
    PassWord: '',
    RememberMe: true
  }

  loading=false

  @Ref('form') readonly form!:HTMLElement

  async handleLogin () {
    this.loading = true
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const valid = await this.form.validate()
      if (valid) {
        await user.login()
      } else {
        throw new Error('请输入账号或者密码')
      }
    } catch (e) {
      this.$toast({
        message: e.message,
        border: true,
        color: 'red'
      })
    }
    this.loading = false
  }

  mounted ():void {
    this.$toast({
      message: '输入任意账号密码登录',
      border: true
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" module>
.loginPage
  position absolute
  width 450px
  top 40%
  left 50%
  max-width 100%
  max-height 100%
  transform translate(-50%,-50%)
  padding 40px
  border-radius 5px
  box-shadow 0 0 18px 0 #c1c1c1
  h1
    text-align-last center
    padding-bottom: 38px;
    font-size 28px
    font-family Microsoft YaHei
    font-weight 400
    letter-spacing 10px
  .reg
    position relative
    a
      position absolute
      cursor pointer
      color #409EFF
      &:first-child
        left 0
      &:last-child
        right 0
      &:hover
        text-decoration underline
  button
    width 100%
</style>
