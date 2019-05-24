import Vue from 'vue'
import App from './App'



import uniNavBar from './components/uni-nav-bar/uni-nav-bar.vue'
import uniIcon from './components/uni-icon/uni-icon.vue'
Vue.component('uni-nav-bar', uniNavBar)
Vue.component('uni-icon', uniIcon)
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
