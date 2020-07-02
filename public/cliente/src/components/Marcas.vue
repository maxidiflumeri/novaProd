<template>
  <div class="container-fluid mt-3">    
    <md-table v-model="buscados" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onSelect">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title text-primary">Marcas</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input class = "text-primary" placeholder="Buscar Marca..." v-model="busqueda" @input="buscarEnTabla" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No hay Estados" >        
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" class="md-primary">
        <md-table-cell  md-label="Id Marca" md-sort-by="ID_MARCA">{{ item.ID_MARCA }}</md-table-cell>
        <md-table-cell  md-label="Descripcion" md-sort-by="DESCRIPCION">{{ item.DESCRIPCION | primeraMayuscula}}</md-table-cell>      

      </md-table-row>      
    </md-table>
    <div class="mt-3 d-flex justify-content-center">
      <md-button class="md-fab md-primary md-mini" @click="nuevoEstado()">
        <md-icon>add</md-icon>
      </md-button>
    </div> 
    <div class="mt-3 d-flex justify-content-center">
      <p>Selected:</p>
      {{ selected }} 
    </div>

  </div>

</template>

<script lang="js">
  import url from '../urls.js'  

    const toLower = text => {
    return text.toString().toLowerCase()
  }

  const buscarPorNombre = (lista, valor) => {
    if (valor) {
      return lista.filter(item => toLower(item.DESCRIPCION).includes(toLower(valor)))
    }
    console.log(valor)

    return lista
  }

  export default  {
    name: 'src-components-marcas',
    props: [],
    mounted () {
      this.getMarcas()

    },
    data () {
      return {
        busqueda: null,
        buscados: [],
        marcas: [],
        selected: {}   

      }
    },
    methods: {
      getMarcas() {
        this.axios.get(url.url + url.urlMarcas)
        .then( res => {         
          this.buscados = res.data 
          this.marcas = res.data
          console.log(this.buscados)  
        
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      buscarEnTabla () {
        this.buscados = buscarPorNombre(this.marcas, this.busqueda)
      },
      nuevoProducto () {
        window.alert('Noop')
      },
      onSelect (item) {
        this.selected = item
      }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-marcas {

  }
</style>
