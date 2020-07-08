<template>
  <div class="container-fluid mt-3">    
    <md-table class="color" v-model="buscados" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onSelect">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title text-primary">Estados</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input class = "text-primary" placeholder="Buscar Estado..." v-model="busqueda" @input="buscarEnTabla" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No hay Estados" >        
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" class="color">
        <md-table-cell  md-label="Id Estado" md-sort-by="ID_ESTADO">{{ item.ID_ESTADO }}</md-table-cell>
        <md-table-cell  md-label="Descripcion" md-sort-by="DESCRIPCION">{{ item.DESCRIPCION | primeraMayuscula}}</md-table-cell>
      </md-table-row>      
    </md-table>
    <div class="mt-3 d-flex justify-content-center">
      <md-button class="md-fab bg-success md-mini" @click="nuevoEstado()">
        <md-icon>refresh</md-icon>
      </md-button>
      <md-button class="md-fab md-primary md-mini" @click="nuevoEstado()">
        <md-icon>add</md-icon>
      </md-button>
    </div> 
    <div class="mt-3 d-flex justify-content-center">     
      <form v-if="estaSeleccionado" class="md-layout">
        <md-card :class="claseCard">
          <md-card-header>
            <div class="md-title d-flex justify-content-center">ESTADO</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <md-field>
                      <label>Id Estado</label>
                      <md-input name="id_estado" id="id_estado" v-model="seleccionadoTemp.id_estado" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>Descripcion</label>
                      <md-input name="descripcion" id="descripcion" v-model="seleccionadoTemp.descripcion" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                </div>
                <div v-if="!estaEditando" class="row d-flex justify-content-center">
                  <md-button class="md-fab md-mini bg-warning" @click="editar()">
                    <md-icon>edit</md-icon>                    
                  </md-button>
                  <md-button class="md-fab md-mini md-plain" @click="ventanaModal()" >
                    <md-icon>delete</md-icon>                    
                  </md-button>
                </div>
                <div v-else class="row d-flex justify-content-center">
                  <md-button class="md-fab md-mini md-primary" @click="modificarEdicion(seleccionadoTemp)">
                    <md-icon>check</md-icon>                    
                  </md-button>
                  <md-button class="md-fab md-mini md-plain" @click="cancelarEdicion()">
                    <md-icon>close</md-icon>                    
                  </md-button>
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </form>
    </div>
    <md-dialog-confirm
      :md-active.sync="activo"
      md-title="Atencion"
      md-content="¿Esta Seguro que desea eliminar el Estado?"
      md-confirm-text="Aceptar"
      md-cancel-text="Cancelar"
      @md-cancel="onCancel"
      @md-confirm="onConfirm(seleccionadoTemp)" />
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
    name: 'src-components-estados',
    props: [],
    mounted () {
      this.estaSeleccionado = false
      this.estaEditando = false 
      if(this.$store.state.token){
        this.getEstados()
      }
      else{
        this.$router.push({path: '/login'})
      }
    },
    data () {
      return {        
        busqueda: null,
        buscados: [],
        estados: [],
        seleccionado: {},
        estaSeleccionado: false,
        claseCard: 'md-layout-item md-size-100 md-small-size-100 color',
        estaEditando: false,
        seleccionadoTemp: {},
        activo: false     

      }
    },
    methods: {
      getEstados() {
        this.axios.get(url.url + url.urlEstados, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
          
          })
          .then( res => {         
          this.buscados = res.data 
          this.estados = res.data
          console.log(this.buscados)  
        
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },
      buscarEnTabla () {
        this.buscados = buscarPorNombre(this.estados, this.busqueda)
      },
      nuevoEstado () {
        window.alert('Noop')
      },
      onSelect (item) {
        if(item){
          this.seleccionadoTemp = {
            id_estado: item.ID_ESTADO,
            descripcion: item.DESCRIPCION            
          } 
          this.seleccionado = item          
          this.estaSeleccionado = true
          console.log("onselect "+this.estaSeleccionado)        

          this.estaEditando = false
          this.claseCard = 'md-layout-item md-size-100 md-small-size-100 color' 
        }else{
          this.estaSeleccionado = false
          this.estaEditando = false              
            
        }    

        console.log(this.seleccionado) 
         
      },

      editar(){        
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100' 
        this.estaEditando = true
      },

      cancelarEdicion(){
        this.estaEditando = false
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100 color' 
        this.seleccionadoTemp = this.seleccionado   
        this.estaSeleccionado = false      
      },

      modificarEdicion(estadoPut){
        console.log("EstadoPut: " + estadoPut.id_estado + " " + estadoPut.descripcion)
        this.axios.put(url.url + url.urlEstados + '/'+ this.seleccionado.ID_ESTADO, estadoPut, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            console.log(res.data)    
            this.getEstados()                      
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
        this.estaEditando = false
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100 color' 
      },

      eliminarEstado(estadoDel){
        this.axios.delete(url.url + url.urlEstados + '/'+ estadoDel.id_estado, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            console.log(res.data)    
            this.getEstados()                      
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })

      },

      onConfirm (estadoDel) {
        this.eliminarEstado(estadoDel)        
      },
      onCancel () {
        this.activo = false
      },

      ventanaModal(){
        this.activo = true
      }


    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.color{
  background: darkgray;
}

</style>
