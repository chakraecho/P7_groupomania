import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from '@/plugins/vuetify.js'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Vue.config.productionTip = false;

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});
import fr from 'vee-validate/dist/locale/fr.json';
localize('fr', fr)

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
