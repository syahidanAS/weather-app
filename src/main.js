import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueAlertify from 'vue-alertify';

Vue.use(require('vue-moment'));
Vue.use(VueAlertify);
Vue.config.productionTip = false;

Vue.use(VueAlertify, {


  // notifier defaults
  notifier: {
    // auto-dismiss wait time (in seconds)
    delay: 5,
    // default position
    position: 'top-right',
    // adds a close button to notifier messages
    closeButton: false,
  },

});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
