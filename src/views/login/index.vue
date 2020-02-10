<template>
  <div>
    <div :class="$style.loginPage">
      <h1>登录</h1>
      <el-form
        :rules="rules"
        ref="loginFrom"
        :model="user"
      >
        <el-form-item prop="LoginName">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入登录名"
            v-model="user.LoginName"
          />
        </el-form-item>
        <el-form-item prop="PassWord">
          <el-input
            prefix-icon="el-icon-key"
            type="password"
            placeholder="请输入登录密码"
            v-model="user.PassWord"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            v-loading="loading"
            type="primary"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { LoginUser } from '@/interface/user'
import { Message } from 'element-ui'
import { namespace } from 'vuex-class'
import { MessageType } from '@/interface/enum'

const user = namespace('user')

@Component
export default class Login extends Vue {
  rules: object={
    LoginName: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    PassWord: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  }

  user: LoginUser={
    LoginName: '',
    PassWord: '',
    RememberMe: true
  }

  loading=false

  // vuex
  @user.Action('login') login!: Function

  async handleLogin () {
    this.loading = true
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const valid = await this.$refs.loginFrom.validate()
      if (valid) {
        await this.login(this.user)
      } else {
        return false
      }
    } catch (e) {
      if (typeof e === 'boolean') {
        this.tips('请输入完整信息', MessageType.error)
      } else if (typeof e === 'string') {
        this.tips(e, MessageType.error)
      }
    }
    this.loading = false
  }

  tips (message = '操作成功', type: MessageType = MessageType.success) {
    Message({
      message,
      type,
      showClose: true
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" module>
  .loginPage
    position absolute
    width 350px
    top 40%
    left 50%
    max-width 100%
    max-height 100%
    transform translate(-50%,-50%)
    padding 40px
    border-radius 5px
    box-shadow 0px 0px 10px 2px #0000004f;
    transition box-shadow  .1s linear
    &:hover
      box-shadow 0px 0px 10px 4px #0000004f;
    h1
      text-align-last center
      font-weight normal
      padding-bottom: 20px;
      font-size 28px
    button
      width 100%
</style>
