<template>
  <v-app>
    <v-app-bar color="primary" fixed app>
      <v-toolbar-title>Opinion Ate</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <restaurant-screen />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import RestaurantScreen from './components/RestaurantScreen.vue'

export default {
	name: 'App',
	components: {
		RestaurantScreen,
	},
}
</script>

RestaurantScreen