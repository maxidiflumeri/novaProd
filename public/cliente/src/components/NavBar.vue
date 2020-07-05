<template >

  <section class="src-components-nav-bar">
    <md-toolbar class="md-primary" md-elevation="1">
      <h3 class="md-title">NOVA Suplies</h3>
      <md-button>        
        <router-link to="/Inicio">
          <a class="text-white" href="#">Inicio</a>
        </router-link>       
      </md-button> 
      <md-button>        
        <router-link to="/Productos">
          <a class="text-white" href="#">Productos</a>
        </router-link>       
      </md-button>
      <md-menu v-if="this.$store.state.perfil" :mdCloseOnClick="click" md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Administracion</md-button>
        <md-menu-content>
          <router-link to="/Estados">
            <a class="text-white" href="#"><md-menu-item>Estados</md-menu-item></a>
          </router-link>  
          <router-link to="/Tipos">
            <a class="text-white" href="#"><md-menu-item>Tipos de Producto</md-menu-item></a>
          </router-link>  
          <router-link to="/Marcas">
            <a class="text-white" href="#"><md-menu-item>Marcas</md-menu-item></a>
          </router-link>  
          <router-link to="/Usuarios">
            <a class="text-white" href="#"><md-menu-item>Usuarios</md-menu-item></a>
          </router-link>            
          <router-link to="/Productos">
            <a class="text-white" href="#"><md-menu-item>Productos</md-menu-item></a>
          </router-link>       
          <router-link to="/Pedidos">
            <a class="text-white" href="#"><md-menu-item>Pedidos</md-menu-item></a>
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
        <label>Buscar Producto...</label>
      </md-autocomplete>
      <md-button v-if="!this.$store.state.token">        
        <router-link to="/Login">
          <a class="text-white" href="#">Login</a>
        </router-link>       
      </md-button>
      <md-menu v-else :mdCloseOnClick="click" md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Mi Cuenta</md-button>
        <md-menu-content>
          <router-link to="/miPerfil">
            <a class="text-white" href="#"><md-menu-item>Mi Perfil</md-menu-item></a>
          </router-link>  
          <router-link to="/misPedidos">
            <a class="text-white" href="#"><md-menu-item>Mis Pedidos</md-menu-item></a>
          </router-link>  
          <router-link to="/">
            <a class="text-white" href="#"><md-menu-item @click="logout">Logout</md-menu-item></a>
          </router-link>                           
        </md-menu-content>
      </md-menu>
      <md-button>  
        <router-link to="/MiCarrito">
          <a class="text-white" href="#"><md-icon>add_shopping_cart</md-icon></a>
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
</style>
