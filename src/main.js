import Vue from 'vue'
import App from './App.vue'
import fa from './components/globals/Fa.vue'

Vue.config.productionTip = false

Vue.component('fa', fa);
new Vue({
  render: h => h(App),
}).$mount('#app')
