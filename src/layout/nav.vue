<template lang="pug">
  v-main
    v-main
      v-main
        v-main
          v-main
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
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
import { Menus } from '@/types/permission'

const user = namespace('user')

@Component({
  components: {}
})
export default class Nav extends Vue {
  activeIndex = '/company'

  @Getter('menu') menus!: Array<Menus>
  @user.Action('loginOut') loginOut!: ()=>void

  @Watch('$route', { deep: true })
  onRouteChange (value: any) {
    this.activeIndex = value.path
  }

  mounted () {
    this.activeIndex = this.$route.path
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
