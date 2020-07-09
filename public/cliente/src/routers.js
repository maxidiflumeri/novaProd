import Vue from  'vue'
import VueRouter from 'vue-router'

import Inicio from './components/Inicio.vue'
import Estados from './components/Estados.vue'
import Login from './components/Login.vue'
import Marcas from './components/Marcas.vue'
import MiCarrito from './components/MiCarrito.vue'
import MiPerfil from './components/MiPerfil.vue'
import MisPedidos from './components/MisPedidos.vue'
import Pedidos from './components/Pedidos.vue'
import Productos from './components/Productos.vue'
import Tipos from './components/Tipos.vue'
import Usuarios from './components/Usuarios.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', redirect: '/Inicio'},
        {path: '/Inicio', component: Inicio},
        {path: '/Estados', component: Estados},
        {path: '/Login', component: Login},
        {path: '/Marcas', component: Marcas},
        {path: '/MiCarrito', component: MiCarrito},
        {path: '/MiPerfil', component: MiPerfil},
        {path: '/MisPedidos', component: MisPedidos},
        {path: '/Pedidos', component: Pedidos},
        {path: '/Productos', component: Productos},
        {path: '/Tipos', component: Tipos},
        {path: '/Usuarios', component: Usuarios}
    ]   
})