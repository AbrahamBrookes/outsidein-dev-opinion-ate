const restaurants = (api, stateOverrides) => ({
	namespaced: true,
	route: '/restaurants',
	state: {
		records: [],
        loading: false,
        loadError: false,
        ...stateOverrides,
	},
	actions: {
		load({commit}) {
            commit('startLoading')
			api.loadRestaurants()
            .then(records => {
				commit('storeRecords', records)
			})
            .catch(() => {
                commit('setLoadingError')
            })
		},
	},
	mutations: {
        startLoading(state){
            state.loading = true
            state.loadError = false
        },
        setLoadingError(state){
            state.loadError = true
            state.loading = false
        },
		storeRecords(state, records) {
			state.records = records
            state.loading = false
		},
	},
})

export default restaurants
