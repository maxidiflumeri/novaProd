<template>

  <div class="container-fluid">
    <div
      v-if="cargando"
      class="loading-overlay d-flex justify-content-center mt-3"
      >
      <md-progress-spinner
        class="colorSpinner"
        md-mode="indeterminate"
        :md-diameter="50"
        :md-stroke="5"
      ></md-progress-spinner>
    </div>
    <div v-else class="row mt-5">
      <div class="col-lg-6">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active"> 
              <div class="middle">
                <img :src="`.${producto.FOTO1}`" alt="First slide" >
              </div>
            </div>
            <div class="carousel-item">
              <div class="middle">
                <img :src="`.${producto.FOTO2}`" alt="Second slide">
              </div>
            </div>
            <div class="carousel-item">
              <div class="middle">
                <img :src="`.${producto.FOTO3}`" alt="Third slide">
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="row">
          <div class="col-lg-12 d-flex justify-content-center">
            <h1 class="text-white">
              {{buscarNombreTipo(producto.ID_TIPO) | primeraMayuscula}} 
              {{buscarNombreMarca(producto.ID_MARCA) | primeraMayuscula}} 
              {{producto.MODELO | primeraMayuscula}}
            </h1>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-lg-12 d-flex justify-content-center">
            <div v-if="producto.STOCK > 0">
              <h3 class="text-success">En Stock</h3>
            </div>
            <div v-else>
              <h3 class="text-danger">Sin Stock</h3>
            </div>
          </div>        
        </div>  
        <div class="row mt-3">
          <div class="col-lg-12 d-flex justify-content-center">
              <h1 class="text-white">$ {{producto.PRECIO}}</h1>
          </div>        
        </div>    
        <div class="row mt-3">
          <div class="col-lg-12 d-flex justify-content-center">
              <h5 class="text-white">{{producto.DESCRIPCION}}</h5>
          </div>        
        </div>   
        <div class="row mt-3">
          <div class="col-lg-12 d-flex justify-content-center">
              <button class="btn btn-lg btn-outline-info">Agregar al carrito</button>
          </div>        
        </div>   
      </div>  
    </div>
  </div>

</template>

<script lang="js">
  import url from '../urls.js' 

  export default  {
    name: 'src-components-producto-detalle',
    props:{
      id_prod: String
    },
   mounted () {
      this.getProductoPorId()
    },
    data () {
      return {
        producto: {},
        cargando: false
      }
    },
    methods: {
      async getProductoPorId(){ 
        try{      
          this.cargando = true   
            const data = await this.axios.get(url.url + url.urlProductos + '?id_producto=' + this.id_prod)
            this.producto = data.data[0]
            console.log(this.producto)
            this.cargando = false  
        }catch(error){
            console.log("Error GET: " + error)
        }
      },

      buscarNombreMarca(id){ 
        const resultado = this.$store.state.listaMarcas.find( elemento => elemento.ID_MARCA == id );        
        return resultado.DESCRIPCION
      },

      buscarNombreTipo(id){ 
        const resultado = this.$store.state.listaTipos.find( elemento => elemento.ID_TIPO == id );        
        return resultado.DESCRIPCION
      },
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.carousel {
  width: 80%;
  height: 100%;
  background-color: white;
} 
.middle {
  position: relative;
  height:500px;
}

.middle img {
  max-width: 100%;
  max-height:100%;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.btn-outline-info {
  color: white;
  border-color: #1d1b38;
  background-color: #1d1b38;
}
.btn-outline-info:hover {
  color: #fff;
  background-color: #39356e;
  border-color: #1d1b38;
}
.btn-outline-info.focus,
.btn-outline-info:focus {
  box-shadow: 0 0 0 0.2rem rgba(29, 27, 56, 1);
}

.btn-outline-info:not(:disabled):not(.disabled).active,
.btn-outline-info:not(:disabled):not(.disabled):active,
.show > .btn-outline-info.dropdown-toggle {
  color: #fff;
  background-color: #1d1b38;
  border-color: #1d1b38;
}
.btn-outline-info.disabled,
.btn-outline-info:disabled {
  color: #1d1b38;
  background-color: transparent;
}

</style>
