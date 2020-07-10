import Vue from 'vue'
import Vuex from 'vuex'
import url from './urls.js' 
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        token: null,
        perfil: null,
        listaTipos: [],
        cargandoTipos: false,
        listaMarcas: [],
        cargandoMarcas: false
    },
    actions : {
        login({commit}, data) {
            commit('login', data)
        },
        logout({commit}) {
            commit('logout')
        },

        async actualizarTipos({commit}){ 
            try{
                commit('cambiarCargandoTipos', true)          
                const data = await axios.get(url.url + url.urlTipos, {            
                headers:
                    {'Authorization': `Bearer ${this.state.token.substr(1, this.state.token.length-2)}`}
                })

                commit('actualizarTipos', data.data)
                commit('cambiarCargandoTipos', false) 
            }catch(error){
                console.log("Error GET: " + error)
            }
        },

        async actualizarMarcas({commit}){ 
            try{
                commit('cambiarCargandoMarcas', true)          
                const data = await axios.get(url.url + url.urlMarcas, {            
                headers:
                    {'Authorization': `Bearer ${this.state.token.substr(1, this.state.token.length-2)}`}
                })
                commit('actualizarMarcas', data.data)              
                commit('cambiarCargandoMarcas', false) 
            }catch(error){
                console.log("Error GET: " + error)
            }
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
        actualizarTipos(state, listaTipos){
            state.listaTipos = listaTipos
        },
        cambiarCargandoTipos(state, estado){
            state.cargandoTipos = estado
        },
        actualizarMarcas(state, listaMarcas){
            state.listaMarcas = listaMarcas
        },
        cambiarCargandoMarcas(state, estado){            
            state.cargandoMarcas = estado
        }
    }
})