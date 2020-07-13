<template >
  <section class="src-components-nav-bar">
    <md-toolbar class="fondo" md-elevation="4" >
        <img src="../assets/logo.png" alt="logo" width="5%">
      <router-link to="/Inicio">
          <md-button>Inicio</md-button>
      </router-link>
      <router-link to="/Productos">
        <md-button class="colorLetrasNav">Productos</md-button>
      </router-link>
      <md-menu
        v-if="this.$store.state.perfil"
        :mdCloseOnClick="click"
        md-size="medium"
        md-align-trigger        
      >
        <md-button class="colorLetrasNav ml-3" md-menu-trigger>Administracion</md-button>
        <md-menu-content> 
          <router-link to="/Estados">
            <a class="text-white" href="#">
              <md-menu-item >Estados</md-menu-item>
            </a>
          </router-link>
          <router-link to="/Tipos">
            <a class="text-white" href="#">
              <md-menu-item>Tipos de producto</md-menu-item>
            </a>
          </router-link>
          <router-link to="/Marcas">
            <a class="text-white" href="#">
              <md-menu-item>Marcas</md-menu-item>
            </a>
          </router-link>
          <router-link to="/Usuarios">
            <a class="text-white" href="#">
              <md-menu-item>Usuarios</md-menu-item>
            </a>
          </router-link>
          <router-link to="/ProductosAdmin">
            <a class="text-white" href="#">
              <md-menu-item>Productos</md-menu-item>
            </a>
          </router-link>
          <router-link to="/Pedidos">
            <a class="text-white" href="#">
              <md-menu-item>Pedidos</md-menu-item>
            </a>
          </router-link>
        </md-menu-content>
      </md-menu>
      <h3 class="md-title" style="flex: 1"></h3>
      <md-autocomplete
        class="search"
        v-model="productoSeleccionado"
        :md-options="productos"
        md-layout="box"
        style="width: 30%"
      >
        <label class="">Buscar producto...</label>
      </md-autocomplete>
      <md-button v-if="!this.$store.state.token">
        <router-link to="/Login">
          <md-button class="colorLetrasNav">Login</md-button>
        </router-link>
      </md-button>
      <md-menu v-else :mdCloseOnClick="click" md-size="medium" md-align-trigger>
        <md-button class="colorLetrasNav ml-3" md-menu-trigger>Mi Cuenta</md-button>
        <md-menu-content>
          <router-link to="/miPerfil">
            <a class="text-white" href="#">
              <md-menu-item>Mi Perfil</md-menu-item>
            </a>
          </router-link>
          <router-link to="/misPedidos">
            <a class="text-white" href="#">
              <md-menu-item>Mis Pedidos</md-menu-item>
            </a>
          </router-link>
          <router-link to="/">
            <a class="text-white" href="#">
              <md-menu-item @click="logout">Logout</md-menu-item>
            </a>
          </router-link>
        </md-menu-content>
      </md-menu>
      <md-button>
        <router-link to="/MiCarrito">
          <md-badge md-content="0" md-dense>
            <md-icon  class="colorLetrasNav">add_shopping_cart</md-icon>
          </md-badge>
        </router-link>
      </md-button>
    </md-toolbar>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-nav-bar',
    props: [],
    mounted () {
      
    },
    data () {
      return {
        productoSeleccionado: null,
        productos: [],
        click: true
      }
    },
    methods: {
      logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('perfil')
        this.$store.dispatch('logout')
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.src-components-nav-bar {
}

.fondo{
  background: #1D1B38 !important;
}

.colorLetrasNav{
  color: white !important;
}

.fondoItem{
  background: #222831 !important;
  background-color: #222831 !important;
  color: #222831 !important;
}
</style>
