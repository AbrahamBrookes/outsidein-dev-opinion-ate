import Vuex from 'vuex'
import {createLocalVue} from '@vue/test-utils'

import restaurants from '@/store/modules/restaurants'

describe('restaurants', () => {
	const localVue = createLocalVue()
	localVue.use(Vuex)

    describe('while loading', () => {
        // create a store witha stubbed api
        const api = {
            // this promise doesn't resolve
            loadRestaurants: () => new Promise(() => {}),
        }
        const store = new Vuex.Store({
            modules: {
                restaurants: restaurants(api)
            }
        })
        // our store is set up to run api.loadRestaurants which, in our stub, does not resolve
        store.dispatch('restaurants/load')
        // while our loadRestaurants call is yet to resolve, loading should equal true
        expect(store.state.restaurants.loading).toEqual(true)
    })

	describe('when loading succeeds', () => {
		it('stores the restaurants', async () => {
			const records = [
				{id: 1, name: 'Sushi Place'},
				{id: 2, name: 'Pizza Place'},
			]

			const api = {
				loadRestaurants: () => Promise.resolve(records),
			}

			const store = new Vuex.Store({
				modules: {
					restaurants: restaurants(api),
				},
			})

			await store.dispatch('restaurants/load')

			expect(store.state.restaurants.records).toEqual(records)
		})
	})
})
