import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import {setInteractionMode} from 'vee-validate'

setInteractionMode('eager') //eager validation

Vue.config.productionTip = false;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
import fr from 'vee-validate/dist/locale/fr.json';
localize('fr', fr)

extend('password', value => {
  if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)){
    return true
  }

  return 'Le mdp doit contenir au moins huit caractère dont une lettre majuscule, miniscule, un chiffre et un caractère spécial.';
});



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
