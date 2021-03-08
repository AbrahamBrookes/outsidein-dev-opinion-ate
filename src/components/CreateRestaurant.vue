<template>
    <form @submit.prevent="saveNewRestaurant()">
        <v-text-field 
            placeholder="Add Restaurant"
            filled
            type="text"
            v-model="name"
            data-testid="new-restaurant-name-field"
        />
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
        }
    },
    methods: {
        ...mapActions({
            createRestaurant: 'restaurants/create',
        }),

        saveNewRestaurant(){
            this.createRestaurant(this.name)
        }
    }
}
</script>

<style>

</style>