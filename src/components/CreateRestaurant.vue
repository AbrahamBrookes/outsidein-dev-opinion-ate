<template>
    <form @submit.prevent="saveNewRestaurant()">
        <v-text-field 
            placeholder="Add Restaurant"
            filled
            type="text"
            v-model="name"
            data-testid="new-restaurant-name-field"
        />
        <div data-testid="new-restaurant-name-error" v-if="validationError">
            Please enter a restaurant name
        </div>
        <div data-testid="new-restaurant-server-error" v-if="serverError">
            There has been an error when saving your new restaurant. Please try again.
        </div>
        <v-btn
            color="primary"
            class="black--text"
            type="submit"
            data-testid="new-restaurant-submit-button"
        >
            Add
        </v-btn>
    </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            name: '',
            validationError: false,
            serverError: false,
        }
    },
    methods: {
        ...mapActions({
            createRestaurant: 'restaurants/create',
        }),

        saveNewRestaurant(){
            this.serverError = false
            
            if(this.name){
                this.validationError = false

                this.createRestaurant(this.name)
                    .then(() => {
                        this.name = ''
                    })
                    .catch(() => {
                        this.serverError = true
                    })

            } else {
                this.validationError = true
            }
        }
    }
}
</script>

<style>

</style>