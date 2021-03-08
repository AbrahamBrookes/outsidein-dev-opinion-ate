import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import {mount, createLocalVue} from '@vue/test-utils'
import flushPromises from 'flush-promises'

import CreateRestaurant from '@/components/CreateRestaurant.vue'

Vue.use(Vuetify)

describe('CreateRestaurant', () => {
    const restaurantName = 'Sushi Place'

    const localVue = createLocalVue()
    localVue.use(Vuex)

    let restaurantsModule, wrapper

    beforeEach(() => {
        restaurantsModule = {
            namespaced: true,
            actions: {
                create: jest.fn().mockName('create'),
            }
        }
        const store = new Vuex.Store({
            modules: {
                restaurants: restaurantsModule
            }
        })

        const div = document.createElement('div')
        document.body.appendChild(div)
        wrapper = mount(CreateRestaurant, {
            localVue,
            store,
            attachTo: div
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    describe('initial state', () => {
        it('does not display a validation error', () => {
            expect(wrapper.find('[data-testid="new-restaurant-name-error"]').exists())
                .toBe(false)
        })
        
        it('does not show a server error', () => {
            expect(wrapper.find('[data-testid="new-restaurant-server-error"]').exists())
                .toBe(false)
        })
    })

    describe('when the form is submitted', () => {
        beforeEach(() => {
            wrapper
                .find('[data-testid="new-restaurant-name-field"]')
                .setValue(restaurantName)
            wrapper
                .find('[data-testid="new-restaurant-submit-button"]')
                .trigger('click')
        })

        it('dispatches the create action', () => {
            expect(restaurantsModule.actions.create).toHaveBeenCalledWith(
                expect.anything(),
                restaurantName
            )
        })

        it('clears the name input', () => {
            expect(wrapper.find('[data-testid="new-restaurant-name-field"]').element.value)
                .toEqual('')
        })

        it('does not show a validation error', () => {
            expect(wrapper.find('[data-testid="new-restaurant-name-error"]').exists())
                .toBe(false)
        })

        it('does not show a server error', () => {
            expect(wrapper.find('[data-testid="new-restaurant-server-error"]').exists())
                .toBe(false)
        })
    })

    describe('when the form is submitted but the name input is empty', () => {
        beforeEach(() => {
            wrapper
                .find('[data-testid="new-restaurant-name-field"]')
                .setValue('')
            wrapper
                .find('[data-testid="new-restaurant-submit-button"]')
                .trigger('click')
        })

        it('displays a validation error', () => {
            expect(wrapper.find('[data-testid="new-restaurant-name-error"]').text())
            .toContain('Please enter a restaurant name')
        })

        it('does not dispatch the create action', () => {
            expect(restaurantsModule.actions.create).not.toHaveBeenCalled()
        })
    })

    describe('when correcting a validation error', () => {
        beforeEach(() => {
            wrapper
                .find('[data-testid="new-restaurant-name-field"]')
                .setValue('')
            wrapper
                .find('[data-testid="new-restaurant-submit-button"]')
                .trigger('click')
            wrapper
                .find('[data-testid="new-restaurant-name-field"]')
                .setValue(restaurantName)
            wrapper
                .find('[data-testid="new-restaurant-submit-button"]')
                .trigger('click')
        })
        
        it('clears the validation error', () => {
            expect(wrapper.find('[data-testid="new-restaurant-name-error"]').exists())
                .toBe(false)
        })
    })

    describe('when the create restaurant server call fails', () => {
        beforeEach(() => {
            restaurantsModule.actions.create.mockRejectedValue()

            wrapper
                .find('[data-testid="new-restaurant-name-field"]')
                .setValue(restaurantName)
            wrapper
                .find('[data-testid="new-restaurant-submit-button"]')
                .trigger('click')
        })

        it('displays a server error', () => {
            expect(wrapper.find('[data-testid="new-restaurant-server-error"]').exists())
                .toBe(true)
        })

        it('does not clear the name', () => {
            expect(wrapper.find('[data-testid="new-restaurant-name-field"]').element.value)
                .toEqual(restaurantName)
        })
    })

    describe('when retrying after a failed create restaurant server call', () => {
        beforeEach(async () => {
            restaurantsModule.actions.create
                .mockRejectedValueOnce()
                .mockResolvedValueOnce()

            wrapper
                .find('[data-testid="new-restaurant-name-field"]')
                .setValue(restaurantName)
            wrapper
                .find('[data-testid="new-restaurant-submit-button"]')
                .trigger('click')
            await flushPromises()
            wrapper
                .find('[data-testid="new-restaurant-submit-button"]')
                .trigger('click')
        })

        it('clears the server error', () => {
            expect(wrapper.find('[data-testid="new-restaurant-server-error"]').exists())
            .toBe(false)
        })
    })
})