import Vue from 'vue'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import Login from './login.vue'
Vue.use(VueResource)
Vue.use(VueValidator)
var main = new Vue({
    el: 'body',
    components: { login: Login }
})
Vue.validator('tel', val => /^\d{8,11}$/.test(val))
