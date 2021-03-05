<template>
	<div>
		<h2>Restaurants list</h2>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
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
