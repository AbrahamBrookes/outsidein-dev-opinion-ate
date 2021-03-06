import Vuex from 'vuex'
import {createLocalVue} from '@vue/test-utils'

import restaurants from '@/store/modules/restaurants'

describe('restaurants', () => {
	const localVue = createLocalVue()
	localVue.use(Vuex)

    describe('load action', () => {

        describe('initial state', () => {
            let store 
            beforeEach(() => {
                store = new Vuex.Store({
                    modules: {
                        restaurants: restaurants()
                    }
                })
            })

            it('does not have the loading flag set', () => {
                expect(store.state.restaurants.loading).toEqual(false)
            })

            it('does not have the loading error flag set', () => {
                expect(store.state.restaurants.loadError).toEqual(false)
            })
        })

        describe('while loading', () => {
            let store
            beforeEach(() => {
                // create a store with a stubbed api
                const api = {
                    // this promise doesn't resolve
                    loadRestaurants: () => new Promise(() => {}),
                }
                store = new Vuex.Store({
                    modules: {
                        restaurants: restaurants(api, {loadError: true})
                    }
                })
                // our store is set up to run api.loadRestaurants which, in our stub, does not resolve
                store.dispatch('restaurants/load')
            })

            it('sets a loading flag', () => {
                // while our loadRestaurants call is yet to resolve, loading should equal true
                expect(store.state.restaurants.loading).toEqual(true)
            })

            it('clears the error flag', () => {
                expect(store.state.restaurants.loadError).toBe(false)
            })
        })

        describe('when loading fails', () => {
            let store
            // set up our store to have a failed load call
            beforeEach(() => {
                const api = {
                    loadRestaurants: () => Promise.reject()
                }
                store = new Vuex.Store({
                    modules: {
                        restaurants: restaurants(api)
                    }
                })
                return store.dispatch('restaurants/load')
            })

            it('sets an error flag', () => {
                expect(store.state.restaurants.loadError).toEqual(true)
            })

            it('clears the loading flag', () => {
                expect(store.state.restaurants.loading).toBe(false)
            })
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

    describe('create action', () => {
        const newRestaurantName = 'Sushi Place'
        const existingRestaurant = {id: 1, name: 'Pizza Place'}
        const responseRestaurant = {id: 2, name: newRestaurantName}

        let api, store, savePromise

        beforeEach(() => {
            api = {
                createRestaurant: jest.fn().mockName('createRestaurant'),
            }
            store = new Vuex.Store({
                modules: {
                    restaurants: restaurants(api, {records: [existingRestaurant]})
                }
            })
        })

        it('sends the restaurant to the server', () => {
            api.createRestaurant.mockResolvedValue(responseRestaurant)
            store.dispatch('restaurants/create', newRestaurantName)
            expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName)
        })

        describe('when save fails', () => {
            it('returns a rejected promise', () => {
                api.createRestaurant.mockRejectedValue()
                savePromise = store.dispatch('restaurants/create', newRestaurantName)
                return expect(savePromise).rejects.toBeUndefined()
            })
        })

        describe('when save succeeds', () => {
            beforeEach(() => {
                api.createRestaurant.mockResolvedValue(responseRestaurant)
                savePromise = store.dispatch('restaurants/create', newRestaurantName)
            })

            it('stores the returned restaurant in the store', () => {
                expect(store.state.restaurants.records).toEqual([
                    existingRestaurant,
                    responseRestaurant
                ])
            })

            it('returns a resolved promise', () => {
                return expect(savePromise).resolves.toBeUndefined()
            })
        })
    })
})
