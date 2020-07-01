import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        estaLogueado: 0      
    },
    actions : {
        login({commit}, estado) {
            commit('login', estado)
        },
        logout({commit}, estado) {
            commit('logout', estado)
        },

    },
    mutations : {
        login(state, estado) {
            state.estaLogueado = estado           
        },
        logout(state, estado){
            state.estaLogueado = estado 
        }
    }
})