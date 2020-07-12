import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authenticated: false,
        sosActive: false,
    },
    getters: {
        isAuth : state => {
            return state.authenticated
        },
        sosActive: state=> {
            return state.sosActive
        }
    },
    mutations: {
        authenticate (state) {
            state.authenticated = true
        },
        logout (state) {
            state.authenticated = false
        },
        sosActivate (state) {
            state.sosActive = true
        },
        sosDeactivate (state) {
            state.sosActive = false
        }
    },
    actions: {
        authenticate (context) {
            context.commit('authenticate')
        },
        logout (context) {
            context.commit('logout')
        },
        sosActivate (context) {
            context.commit('sosActivate')
        },
        sosDeactivate (context) {
            context.commit('sosDeactivate')
        }
    }
});
