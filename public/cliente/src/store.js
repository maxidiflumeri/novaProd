import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        token: null,
        perfil: null,
        tipos: []
    },
    actions : {
        login({commit}, data) {
            commit('login', data)
        },
        logout({commit}) {
            commit('logout')
        },
        actualizaTipos({commit}, listaTipos){
            commit('actualizaTipos', listaTipos)
        }

    },
    mutations : {
        login(state, data) {
            state.token = data.token
            state.perfil = data.perfil
        },
        logout(state){
            state.token = null
            state.perfil = null
        },
        actualizaTipos(state, listaTipos){
            state.tipos = listaTipos
        }
    }
})