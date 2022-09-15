import { createStore } from 'vuex'

export default createStore({
    state: {
        URL_SERVER: 'http://localhost:4000',
        isAuthenticated: false
    },
    getters: {
        // get value autenticate
        isAuthenticated (state) {
            return state.isAuthenticated
        }
    },
    mutations: {
        // state autenticated
        AuthenticatedToTrue (state) {
            state.isAuthenticated = true
        },
        AuthenticatedToFalse (state) {
            state.isAuthenticated = false
        },
        AuthenticatedToggle (state) {
            state.isAuthenticated = !state.isAuthenticated
        },
    },
    actions: {
    },
    modules: {
    }
})
