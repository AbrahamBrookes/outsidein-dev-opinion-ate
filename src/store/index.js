import Vue from 'vue'
import Vuex from 'vuex'

// our cruft
import api from '@/store/api'

// modules
import restaurants from './modules/restaurants'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		restaurants: restaurants(api),
	},
})
