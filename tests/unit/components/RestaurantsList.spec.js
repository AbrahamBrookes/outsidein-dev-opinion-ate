import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import {mount, createLocalVue} from '@vue/test-utils'

import RestaurantsList from '@/components/RestaurantsList'


// we're using vuetify so we want to include it in our tests to squash errors
Vue.use(Vuetify)
// first set up the environment for our tests
const localVue = createLocalVue()
localVue.use(Vuex)

const records = [
	{
		id: 1,
		name: 'Sushi Place',
	},
	{
		id: 2,
		name: 'Pizza Place',
	},
]

let restaurantsModule, wrapper

function mountWithStore(state = {records, loading: false, loadError: false}){
	// a mock modue that will be used by the component we are testing
	restaurantsModule = {
		namespaced: true,
		state,
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
	wrapper = mount(RestaurantsList, {localVue, store})
}

describe('RestaurantsList', () => {

	// run some tests on it!
	it('loads restaurants on mount', () => {
		mountWithStore()
		expect(restaurantsModule.actions.load).toHaveBeenCalled()
	})

	it('displays a loading indicator when loading', () => {
		mountWithStore({loading: true})
		expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(true)
	})

    describe('when loading fails', () => {
        beforeEach(() => {
			mountWithStore({loadError: true})
		})
		
		it('displays an error popup', () => {
			expect(wrapper.find('[data-testid="loading-error"]').exists()).toBe(true)
		})
    })

	describe('when loading succeeds', () => {
		beforeEach(() => {
			mountWithStore()
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

		it('displays no loading indicator when not loading', () => {
			expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(false)
		})

		it('displays no error popup when there is no error', () => {
			expect(wrapper.find('[data-testid="loading-error"]').exists()).toBe(false)
		})
		
	})
})
