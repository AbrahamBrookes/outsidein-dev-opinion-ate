<template>
	<v-card>
		<v-card-title>Restaurants</v-card-title>
		<v-card-text>
			<restaurants-list />
		</v-card-text>
	</v-card>
</template>

<script>
import RestaurantsList from '@/components/RestaurantsList'
export default {
	components: {
		RestaurantsList,
	},
}
</script>
