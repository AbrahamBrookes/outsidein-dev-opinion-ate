import Vue from 'vue'
import Vuex from 'vuex'

// modules
import restaurants from './modules/restaurants'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		restaurants: restaurants(),
	},
})
