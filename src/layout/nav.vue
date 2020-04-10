<template>
  <nav :class="$style.nav">
    <h1>{{sysName}}</h1>
    <el-dropdown :class="$style.dropdown" trigger="click" @command="handleClick">
      <span class="el-dropdown-link">
        {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="editInfo">企业信息修改</el-dropdown-item>
            <el-dropdown-item command="editPassword">更改密码</el-dropdown-item>
            <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
    </el-dropdown>

    <el-dialog :title="title" :visible.sync="visible" append-to-body @close="handleClosed">
      <div :class="$style.component">
        <component :is="currentComponent" :enterpriseId="company.Id" />
      </div>
    </el-dialog>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
import Info from '@/views/Register/info.vue'
import { getUserEnterprise } from '@/apis/enterprise'
import { Enterprise, UserInfo } from '@/interface/user'
import { getUserInfo } from '@/utils/auth'
import EditPw from '@/components/editPw/index.vue'

const user = namespace('user')

enum MenuCommand{
  editInfo='editInfo',
  editPassword='editPassword',
  loginOut='loginOut'
}

@Component({
  components: {
    Info,
    EditPw
  }
})
export default class Nav extends Vue {
  visible=false
  title=''
  currentComponent=''
  userInfo: UserInfo = getUserInfo()
  company: Enterprise={
    BuildCompany: '',
    CreateTime: '',
    CreateUser: null,
    Id: '',
    IsDeleted: false,
    LegalIdAddress: '',
    LegalNumber: '',
    Legaler: '',
    LicenseAddress: '',
    ModifyTime: '',
    ModifyUser: null,
    NO: '',
    Name: '',
    NickName: '',
    UserId: '',
    UserNO: '',
    UserName: ''
  }

  @Getter user!: UserInfo

  @user.Action('loginOut') loginOut!: Function

  get sysName () {
    let str = ''
    const roles: Array<string> = this.user.role
    if (roles.includes('SuperAdmin')) {
      str = '系统管理'
    } else if (roles.includes('执法人员')) {
      str = '豁免核实系统'
    } else if (roles.includes('企业')) {
      str = '企业账号管理'
    }
    return str
  }

  get userName () {
    let name = ''
    const roles: Array<string> = this.user.role
    if (roles.includes('SuperAdmin')) {
      name = '系统管理员'
    } else if (roles.includes('执法人员')) {
      name = '豁免核实员'
    } else if (roles.includes('企业')) {
      name = this.company ? this.company.Name : '-'
    }
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
        this.visible = true
        this.currentComponent = 'EditPw'
        this.title = '修改密码'
        this.company.Id = this.user.sub[0]
        break
      case MenuCommand.loginOut:
        this.loginOut()
        break
    }
  }

  async getEnterprise () {
    const res: any = await getUserEnterprise()
    if (res.data) {
      this.company = res.data
    }
  }

  editSuccess () {
    this.visible = false
    this.getEnterprise()
  }

  handleClosed () {
    this.currentComponent = ''
  }

  mounted () {
    this.getEnterprise()
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
