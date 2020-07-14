<template>
  <div class="container-fluid mt-3">
    <!-- <div
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
    <div v-else class="row mt-5">-->
      <div class="row mt-3">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active inactive"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1" class="inactive"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2" class="inactive"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4" class="inactive"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="5" class="inactive"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active"> 
              <div class="middle">
                <img src="../../public/img/banner4.png" alt="First slide" >
              </div>
            </div>
            <div class="carousel-item">
              <div class="middle">
                <img src="../../public/img/banner4.png" alt="Second slide">
              </div>
            </div>
            <div class="carousel-item">
              <div class="middle">
                <img src="../../public/img/banner4.png" alt="Third slide">
              </div>
            </div>
            <div class="carousel-item">
              <div class="middle">
                <img src="../../public/img/banner4.png" alt="Third slide">
              </div>
            </div>
            <div class="carousel-item">
              <div class="middle">
                <img src="../../public/img/banner4.png" alt="Third slide">
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
      <div class="row informacion d-flex justify-content-center text-center">
        <div class="col-lg-4 mt-3">
          <div class="row">
            <div class="col-lg-2 mt-2">
              <md-icon class="md-size-2x">local_shipping</md-icon>
            </div>
            <div class="col-lg-10">
              <h3>Envios a todo el pais</h3>
              <p>Despachamos en el dia</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mt-3">
          <div class="row">
            <div class="col-lg-2 mt-2">
              <md-icon class="md-size-2x">map</md-icon>
            </div>
            <div class="col-lg-10">
              <h3>Retira por nuestro local</h3>
              <p>Ubicación</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mt-3">
          <div class="row">
            <div class="col-lg-2 mt-2">
              <md-icon class="md-size-2x">check</md-icon>
            </div>
            <div class="col-lg-10">
              <h3>Productos originales sellados</h3>
              <p>Garantias oficiales en todos los productos</p>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script lang="js">

  export default  {
    name: 'src-components-inicio',
    props: [],
    mounted () {

    },
    data () {
      return {
        cargando: false,
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-inicio {

  }

  .carousel-indicators .inactive{
    background-color: #48448a;
}

.carousel-indicators .active{
    background-color: #1D1B38;
}

.carousel {
  width: 100%;
  height: 100%;
  background-color: white;
} 
.middle {
  position: relative;
  height:500px;
}

.middle img {
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

.informacion{
  border-top: solid;
  border-bottom: solid;
  border-color: #1D1B38;
  height: 110px;
  justify-content: center;
  color: white;
  background-image: url("../../public/img/infoBanner.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}


</style>
