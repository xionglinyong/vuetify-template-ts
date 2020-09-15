import { Module, VuexModule } from 'vuex-module-decorators'
import store from '@/store/index'
import { Themes } from '@/types/config'

@Module({
  dynamic: true,
  store,
  name: 'SystemConfig',
  namespaced: true,
  stateFactory: true
})
export default class SystemConfig extends VuexModule {
  readonly themes: Themes = {
    warm: {
      primary: '#00abff',
      secondary: '#424242',
      accent: '#6583bd',
      error: '#d76e6e',
      info: '#92adc9',
      success: '#72c676',
      warning: '#d2b871'
    },
    chineseDark: {
      primary: '#346c9c',
      secondary: '#2b1216',
      accent: '#6583bd',
      error: '#a61b29',
      info: '#7a7374',
      success: '#40a070',
      warning: '#fed71a'
    }
  }
}
