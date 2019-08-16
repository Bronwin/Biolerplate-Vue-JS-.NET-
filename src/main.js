import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import App from './App.vue';
import Vuex from 'vuex'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main';

// router setup
import routes from './routes/routes';

// plugin setup
Vue.use(VueRouter);
Vue.use(LightBootstrap);
Vue.use(Vuetify);
Vue.use(Vuex);

//configure router
var router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
})

export var eventBus = new Vue();

const store = new Vuex.Store({
	state: {
		messageLine: []
	},
	mutations: {
		push(state, message) {
			return state.messageLine.push(message);
		},
		shift(state) {
			return state.messageLine.shift();
		}
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
  render: function (h) {
    return h(App)
	},
	router
})

