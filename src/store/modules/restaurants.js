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
        create({commit}, newRestaurantName){
            api.createRestaurant(newRestaurantName).then(record => {
                commit('addRecord', record)
            })
        }
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
        addRecord(state, record){
            state.records.push(record)
        }
	},
})

export default restaurants
