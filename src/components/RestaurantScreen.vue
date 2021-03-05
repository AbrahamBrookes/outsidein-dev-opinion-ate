<template>
	<div>
		<h1>Restaurants</h1>
		<restaurants-list />
	</div>
</template>

<script>
import RestaurantsList from '@/components/RestaurantsList'
export default {
	components: {
		RestaurantsList,
	},
}
</script>
