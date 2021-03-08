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
            validationError: false
        }
    },
    methods: {
        ...mapActions({
            createRestaurant: 'restaurants/create',
        }),

        saveNewRestaurant(){
            if(this.name){
                this.validationError = false

                this.createRestaurant(this.name)
                    .then(() => {
                        this.name = ''
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