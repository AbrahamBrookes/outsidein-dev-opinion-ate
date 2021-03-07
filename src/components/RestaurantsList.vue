<template>
	<div>
        <v-progress-circular
            indeterminate
            color="primary"
            data-testid="loading-indicator"
            v-if="loading"
        />
        <div
            v-if="loadError" 
            data-testid="loading-error"
        >
            Restaurants failed to load
        </div>
        <v-list-item 
            v-for="restaurant in restaurants"
            :key="restaurant.id"
            data-testid="restaurant"
        >
            <v-list-item-content>
                <v-list-item-title>
                    {{ restaurant.name }}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
	</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            restaurants: state => state.restaurants.records,
            loading: state => state.restaurants.loading,
            loadError: state => state.restaurants.loadError
        })
    },
    methods: {
        ...mapActions({
            loadRestaurants: 'restaurants/load'
        })
    },
    mounted(){
        this.loadRestaurants()
    }
}
</script>
