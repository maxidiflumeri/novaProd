<template>
  <div class="container-fluid mt-3">    
    <md-table v-model="buscados" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onSelect">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title text-primary">Usuarios</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input class = "text-primary" placeholder="Buscar Usuario..." v-model="busqueda" @input="buscarEnTabla" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No hay Estados" >        
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" class="md-primary">
        <md-table-cell  md-label="Id Usuario" md-sort-by="ID_USUARIO">{{ item.ID_USUARIO }}</md-table-cell>
        <md-table-cell  md-label="Nombre" md-sort-by="NOMBRE">{{ item.NOMBRE | primeraMayuscula}}</md-table-cell>
        <md-table-cell  md-label="Apellido" md-sort-by="APELLIDO">{{ item.APELLIDO | MayusculaEnSeparados}}</md-table-cell>        
        <md-table-cell  md-label="Fecha de Nacimiento" md-sort-by="FECHA_NACIMIENTO">{{ item.FECHA_NACIMIENTO | formatearFecha}}</md-table-cell> 
        <md-table-cell  md-label="Correo Electrónico" md-sort-by="CORREO">{{ item.CORREO}}</md-table-cell> 
        <md-table-cell  md-label="Sexo" md-sort-by="SEXO">{{ item.SEXO | primeraMayuscula}}</md-table-cell> 
        <md-table-cell  md-label="Administrador" md-sort-by="ADMINISTRADOR">{{ item.ADMINISTRADOR  }}</md-table-cell> 
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
    name: 'src-components-usuarios',
    props: [],
    mounted () {
      if(this.$store.state.token){
        this.getUsuarios()
      }
      else{
        this.$router.push({path: '/login'})
      }
      
    },
    data () {
      return {
        busqueda: null,
        buscados: [],
        usuarios: [],
        selected: {}
      }
    },
    methods: {
      getUsuarios() {
        this.axios.get(url.url + url.urlUsuarios, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
          })
        .then( res => {         
          this.buscados = res.data 
          this.usuarios = res.data
          console.log(this.buscados)  
        
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      buscarEnTabla () {
        this.buscados = buscarPorNombre(this.usuarios, this.busqueda)
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
  .src-components-usuarios {

  }
</style>
