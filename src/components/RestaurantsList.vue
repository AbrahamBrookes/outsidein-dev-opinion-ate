<template>
	<div>
		<h2>Restaurants list</h2>
        <ul>
            <li 
                v-for="restaurant in restaurants"
                :key="restaurant.id"
                data-testid="restaurant"
            >
                {{ restaurant.name }}
            </li>
        </ul>
	</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            restaurants: state => state.restaurants.records,
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
