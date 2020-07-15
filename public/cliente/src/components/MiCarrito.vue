<template>

  <div class="container">
    <div v-for="(detalleCarrito,index) in this.$store.state.carrito" :key="index">
      <div class="row text-white mt-5">
        <div class="col-lg-2">
          <img class="imagenCarr" :src="detalleCarrito.producto.FOTO1" alt="foto1">
        </div>
        <div class="col-lg-6">
          <h4>{{listaTipos[index] | primeraMayuscula}} {{listaMarcas[index] | primeraMayuscula}} {{detalleCarrito.producto.MODELO}}</h4>
        </div>
        <div class="col-lg-2">
          <div class="row">
            <button class="btn btn-sm btn-outline-info ml-3" @click="restar(detalleCarrito)">-</button>
            <input readonly class="form-control text-center cantidad mt-1" style="width: 60px !important" min="1" value="1" v-model="detalleCarrito.cantidad">
            <button class="btn btn-sm btn-outline-info" @click="sumar(detalleCarrito)">+</button>
          </div>
        </div>
        <div class="col-lg-2">
          <h2>${{detalleCarrito.producto.PRECIO * detalleCarrito.cantidad}}</h2>
        </div>
      </div>
      <hr class="bg-white mt-5">
    </div>
  </div>

</template>

<script lang="js">

  export default  {
    name: 'src-components-mi-carrito',
    props: [],
    mounted () {
      this.getProductosMarcasTipos()
    },
    data () {
      return {
        listaMarcas: [],
        listaTipos: []
      }
    },
    methods: {
      async getProductosMarcasTipos(){
        await this.$store.dispatch('actualizarMarcas')
        await this.$store.dispatch('actualizarTipos')
        await this.$store.dispatch('actualizarProductos')
        this.completarListas()
      },
      buscarProductoId(id){ 
        const resultado = this.$store.state.listaProductos.find( elemento => elemento.ID_PRODUCTO == id );    
        return resultado
      },
      buscarNombreMarca(id){ 
        const resultado = this.$store.state.listaMarcas.find( elemento => elemento.ID_MARCA == id );
        return resultado.DESCRIPCION
      },
      buscarNombreTipo(id){ 
        const resultado = this.$store.state.listaTipos.find( elemento => elemento.ID_TIPO == id );
        return resultado.DESCRIPCION
      },
      completarListas(){
        this.$store.state.carrito.forEach(element => {
          this.listaMarcas.push(this.buscarNombreMarca(element.producto.ID_MARCA))
          this.listaTipos.push(this.buscarNombreTipo(element.producto.ID_TIPO))
        });
      },
      sumar(detalleCarrito){
        this.$store.dispatch('agregarProductoCarrito', {producto: detalleCarrito.producto, cantidad: 1})
        localStorage.setItem('carrito', JSON.stringify(this.$store.state.carrito))
        this.$store.dispatch('contarProductos')
      },
      restar(detalleCarrito){
        if(detalleCarrito.cantidad > 1){
          this.$store.dispatch('restarProductoCarrito', {producto: detalleCarrito.producto, cantidad: 1})
          localStorage.setItem('carrito', JSON.stringify(this.$store.state.carrito))
          this.$store.dispatch('contarProductos')
        }
      }
    },
    computed: {
    }
}


</script>

<style scoped lang="css">
  .src-components-mi-carrito {

  }

  .imagenCarr{
    width: 50%;
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
