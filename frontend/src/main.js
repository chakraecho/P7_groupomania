import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './utils.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import TextareaAutosize from 'vue-textarea-autosize'
 
Vue.use(TextareaAutosize)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')