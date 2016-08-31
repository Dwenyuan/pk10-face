import Vue from 'vue'
import ManagerApp from './components/managerapp.vue'
import VueResource from 'vue-resource'
import $ from 'jquery'
import bootstrap from 'bootstrap'
import VueRouter from 'vue-router'
import usermanager from './components/usermanager.vue'
import goodmanager from './components/goodmanager.vue'
import systemsetting from './components/systemsetting.vue'
import lotteryhistory from './components/lotteryhistory.vue'
import agent from './components/agent.vue'
Vue.use(VueResource)
Vue.filter('date', (UTCdate) => {
    return new Date(UTCdate).toLocaleString()
})
Vue.filter('datetime', value => {
    let date = new Date(value)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
        // return new Date(value).toLocaleString()
})
var mainManager = Vue.extend({
    components: {
        managerApp: ManagerApp,
        usermanager: usermanager,
        goodmanager: goodmanager,
        systemsetting: systemsetting,
        lotteryhistory: lotteryhistory,
        agent: agent,
    }
})
Vue.use(VueRouter)
var router = new VueRouter()
router.map({
    '/systemsetting': {
        component: systemsetting
    },
    '/usermanager': {
        component: usermanager
    },
    '/goodmanager': {
        component: goodmanager
    },
    '/lotteryhistory': {
        component: lotteryhistory
    },
    '/agent': {
        component: agent
    }
})
router.start(mainManager, 'body')