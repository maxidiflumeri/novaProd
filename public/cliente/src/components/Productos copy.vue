<template>
  <div class="container mt-3">
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!------------------------- Creacion de la tabla que muestra los resultados ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div class="row">
      <div class="col-lg-2"><h3 class="text-white">FILTROS</h3></div>
      <div class="col-lg-10">
        <div class="row">
          <div class="col-lg-4 col-sm-6" v-for="(producto, index) in this.$store.state.listaProductos" :key="index">
            <div class="card m-3 bg-dark text-white" style="width: 18rem;">
              <img class="card-img-top" src="https://sites.google.com/site/informaticaieensma/_/rsrc/1475587926360/historia-de-los-computadores/que-es-una-computadora/computadora.jpg" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${{producto.PRECIO}}</h5>
                <div v-if="producto.STOCK > 0">
                  <span class="text-success">En Stock</span>
                </div>
                <div v-else>
                  <span class="text-danger">Sin Stock</span>
                </div>
                <p class="card-text mt-2">{{producto.MODELO}}</p>
                <button href="#" class="btn btn-outline-info" @click="detalleProducto(producto)">Ver detalles</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">

  export default  {
    name: 'src-components-productos',
    props: [],
    mounted () {
      this.getProductos() 
    },
    data () {
      return {
      }
    },
    methods: {
      // metodo que trae todos los elementos
      async getProductos() {      
        await this.$store.dispatch('actualizarProductos')
      },

      // metodo que me lleva a la vista del detalle de un producto especifico
      detalleProducto(producto){
        let id = producto.ID_PRODUCTO
        this.$router.push({path: `/ProductoDetalle/${id}`})
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">

md-table-row md-table-cell {
  color: white !important;
}

.card-expansion {
  height: 100%;
}

.md-card {
  width: 100%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

.btn-outline-info{
  color: white;
  border-color:#1D1B38;
  background-color:#1D1B38;
}
.btn-outline-info:hover{
  color:#fff;
  background-color:#39356e;
  border-color:#1D1B38
}
.btn-outline-info.focus,.btn-outline-info:focus{
  box-shadow:0 0 0 .2rem rgba(29, 27, 56, 1)
}

.btn-outline-info:not(:disabled):not(.disabled).active,
.btn-outline-info:not(:disabled):not(.disabled):active,.show>.btn-outline-info.dropdown-toggle{
  color:#fff;
  background-color:#1D1B38;
  border-color:#1D1B38
}
.btn-outline-info.disabled,.btn-outline-info:disabled{
  color:#1D1B38;background-color:transparent
}

</style>
