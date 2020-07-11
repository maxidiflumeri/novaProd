<template>
  <div class="container mt-3">
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!------------------------- Creacion de la tabla que muestra los resultados ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div class="row">
      <div class="col-lg-3"><h3 class="text-white">FILTROS</h3></div>
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-4" v-for="(producto, index) in this.$store.state.listaProductos" :key="index">
            <md-card class="mt-3">
              <md-card-media>
                <img
                  src="https://sites.google.com/site/informaticaieensma/_/rsrc/1475587926360/historia-de-los-computadores/que-es-una-computadora/computadora.jpg"
                  alt="People"
                  class="mx-auto"
                  width="10%"
                  height="10%"
                />
              </md-card-media>

              <md-card-header>
                <div class="md-title">Hola</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header>

              <md-card-expand>
                <md-card-actions md-alignment="space-between">
                  <div>
                    <md-button>VER</md-button>
                  </div>
                </md-card-actions>
              </md-card-expand>
            </md-card>
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
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.src-components-productos {
}

md-table-row md-table-cell {
  color: white !important;
}

.card-expansion {
  height: 380px;
}

.md-card {
  width: 240px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
