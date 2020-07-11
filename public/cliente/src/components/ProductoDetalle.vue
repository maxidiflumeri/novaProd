<template>

  <div class="container-fluid">
    <div class="row mt-5">
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
                <img src="../assets/image.png" alt="First slide" >
              </div>
            </div>
            <div class="carousel-item">
              <div class="middle">
                <img src="https://thumbs.dreamstime.com/b/monitor-vertical-del-lcd-15376377.jpg" alt="Second slide">
              </div>
            </div>
            <div class="carousel-item">
              <div class="middle">
                <img src="https://sites.google.com/site/informaticaieensma/_/rsrc/1475587926360/historia-de-los-computadores/que-es-una-computadora/computadora.jpg" alt="Third slide">
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
        producto: null
      }
    },
    methods: {
      async getProductoPorId(){ 
        try{        
          console.log(url.url + url.urlProductos + '?id_producto=' + this.id_prod)
            const data = await this.axios.get(url.url + url.urlProductos + '?id_producto=' + this.id_prod, {            
            headers:
                {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
            })
            this.producto = data.data
        }catch(error){
            console.log("Error GET: " + error)
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.carousel {
  width: 800px;
  height: 500px;
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

</style>
