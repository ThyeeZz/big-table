import Vue from 'vue';
import BigTable from './src/index.vue'

const install = () => {
  Vue.component(BigTable.name, BigTable)
}

export default install