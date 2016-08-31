import Vue from 'vue'
import ManagerApp from './components/managerapp.vue'
import VueResource from 'vue-resource'
import $ from 'jquery'
import bootstrap from 'bootstrap'
import VueRouter from 'vue-router'
import usermanager from './components/usermanager.vue'
import goodmanager from './components/goodmanager.vue'
Vue.use(VueResource)
Vue.filter('date', (UTCdate) => {
    return new Date(UTCdate).toLocaleString()
})
var mainManager = Vue.extend({
    components: {
        managerApp: ManagerApp,
        usermanager: usermanager,
        goodmanager: goodmanager
    }
})
Vue.use(VueRouter)
var router = new VueRouter()
router.map({
    '/usermanager': {
        component: usermanager
    },
    '/goodmanager': {
        component: goodmanager
    }
})
router.start(mainManager, 'body')
