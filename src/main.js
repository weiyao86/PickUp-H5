import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueWechatTitle from 'vue-wechat-title'
import Utils from './script/utils'
//适配REM转换
import './script/adjust'

import "@assets/styles/reset.scss";
import 'vant/lib/index.css';
import 'animate.css';
import '@assets/styles/global.scss';

Vue.config.productionTip = false

let FastClick = require('fastclick');
FastClick.attach(document.body);
//use common ui cmp
Vue.use(VueWechatTitle);

//custom plug
Vue.use(Utils);

window.__GlobalVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
