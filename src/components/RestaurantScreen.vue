<template>
	<v-card>
		<v-card-title>Restaurants</v-card-title>
		<v-card-text>
			<create-restaurant />
			<restaurants-list />
		</v-card-text>
	</v-card>
</template>

<script>
import CreateRestaurant from '@/components/CreateRestaurant.vue'
import RestaurantsList from '@/components/RestaurantsList'

export default {
	components: {
		CreateRestaurant,
		RestaurantsList,
	},
}
</script>

CreateRestaurant