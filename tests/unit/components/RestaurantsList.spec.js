import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import {mount, createLocalVue} from '@vue/test-utils'

import RestaurantsList from '@/components/RestaurantsList'

describe('RestaurantsList', () => {
	// we're using vuetify so we want to include it in our tests to squash errors
	Vue.use(Vuetify)
	// first set up the environment for our tests
	const localVue = createLocalVue()
	localVue.use(Vuex)
	// a mock modue that will be used by the component we are testing
	const restaurantsModule = {
		namespaced: true,
		state: {
			records: [
				{
					id: 1,
					name: 'Sushi Place',
				},
				{
					id: 2,
					name: 'Pizza Place',
				},
			],
		},
		actions: {
			load: jest.fn().mockName('load'),
		},
	}
	// load up our test store with the mock module
	const store = new Vuex.Store({
		modules: {
			restaurants: restaurantsModule,
		},
	})
	// mount the component we are testing to our local environment
	const wrapper = mount(RestaurantsList, {localVue, store})

	// run some tests on it!
	it('loads restaurants on mount', () => {
		expect(restaurantsModule.actions.load).toHaveBeenCalled()
	})

	it('displays a list of restaurants', () => {
		const firstRestaurantName = wrapper
			.findAll('[data-testid="restaurant"]')
			.at(0)
			.text()
		expect(firstRestaurantName).toBe('Sushi Place')
		const secondRestaurantName = wrapper
			.findAll('[data-testid="restaurant"]')
			.at(1)
			.text()
		expect(secondRestaurantName).toBe('Pizza Place')
	})
})
