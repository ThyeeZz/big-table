import Vue from 'vue'
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Table,
  TableColumn,
  Button
} from 'element-ui';
import BigTable from './components/BigTable/index.js'
require('./mock')
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(BigTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
