<template>
	<div>
        <v-progress-circular
            indeterminate
            color="primary"
            data-testid="loading-indicator"
            v-if="loading"
        />
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
            loading: state => state.restaurants.loading
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
