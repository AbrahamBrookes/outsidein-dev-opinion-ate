describe('Listing restaurants', () => {
	it('Shows restaurants from the API', () => {
		const sushiPlace = 'Sushi Place'
		const pizzaPlace = 'Pizza Place'

		cy.server({
			force404: true,
		})

		cy.route({
			method: 'GET',
			url: 'https://outside-in-dev-api.herokuapp.com/1xYU87pyIfSPT9t9Pwrlv2QooZowK3iQ/restaurants',
			response: [
				{id: 1, name: sushiPlace},
				{id: 2, name: pizzaPlace},
			],
		})

		cy.visit('/')
		cy.contains(sushiPlace)
		cy.contains(pizzaPlace)
	})
})