import Vuex from 'vuex'
import {createLocalVue} from '@vue/test-utils'

import restaurants from '@/store/modules/restaurants'

describe('restaurants', () => {
	const localVue = createLocalVue()
	localVue.use(Vuex)

    describe('initial state', () => {
        it('does not have the loading flag set', () => {
            const store = new Vuex.Store({
                modules: {
                    restaurants: restaurants()
                }
            })
            expect(store.state.restaurants.loading).toEqual(false)
        })
    })

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
        const records = [
            {id: 1, name: 'Sushi Place'},
            {id: 2, name: 'Pizza Place'},
        ]
        let store

        beforeEach(() => {
            const api = {
                loadRestaurants: () => Promise.resolve(records),
            }
            store = new Vuex.Store({
                modules: {
                    restaurants: restaurants(api),
                },
            })
            return store.dispatch('restaurants/load')
        })

		it('stores the restaurants', () => {
			expect(store.state.restaurants.records).toEqual(records)
		})

        it('clears the loading flag', () => {
            expect(store.state.restaurants.loading).toEqual(false)
        })
	})
})
