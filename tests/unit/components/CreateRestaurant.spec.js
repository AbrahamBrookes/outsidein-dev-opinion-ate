import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import {mount, createLocalVue} from '@vue/test-utils'

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
            expect(wrapper.find('[data-testid="new-restaurant-name-field"]')
                .element.value).toEqual('')
        })
    })
})