<template>
  <div class="container-fluid mt-3">
    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!------------------------- Creacion de la tabla que muestra los resultados ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div v-if="cargando" class="loading-overlay d-flex justify-content-center">
      <md-progress-spinner class="colorSpinner" md-mode="indeterminate" :md-diameter="50" :md-stroke="5"></md-progress-spinner>
    </div>
    <div v-else>
      <md-table v-model="buscados" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-seleccionado="onSelect">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Usuarios</h1>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input class = "text-primary" placeholder="Buscar Usuario..." v-model="busqueda" @input="buscarEnTabla" />
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No hay Usuarios" >        
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
      <!-- -------------------------------------------------------------------------------------------------------------------- -->    
      <!-------------------------------- Botones de creacion y actualizacion ----------------------------------------------------->
      <!-- -------------------------------------------------------------------------------------------------------------------- -->
        <div class="mt-3 d-flex justify-content-center">
          <md-button class="md-fab bg-success md-mini" @click="getUsuarios()">
            <md-icon>refresh</md-icon>
          </md-button>
          <md-button class="md-fab md-primary md-mini" @click="mostrarNuevo()">
            <md-icon>add</md-icon>
          </md-button>
        </div>
    </div>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!-------------------------------- Card que muestra el detalle del elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div class="mt-3 d-flex justify-content-center">     
      <form v-if="estaSeleccionado" class="md-layout">
        <md-card :class="claseCard">
          <md-card-header>
            <div class="md-title d-flex justify-content-center">USUARIO</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <md-field>
                      <label>Id Usuario</label>
                      <md-input name="id_usuario" id="id_usuario" v-model="seleccionadoTemp.id_usuario" :disabled="!estaEditando" />
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
                  <md-button class="md-fab md-mini bg-warning" @click="habilitarEdicion()">
                    <md-icon>edit</md-icon>                    
                  </md-button>
                  <md-button class="md-fab md-mini md-plain" @click="activo = true" >
                    <md-icon>delete</md-icon>                    
                  </md-button>
                </div>
                <div v-else class="row d-flex justify-content-center">
                  <md-button class="md-fab md-mini md-primary" @click="confirmarEdicion(seleccionadoTemp)">
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
    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!---------------------------- Modal de confirmacion para eliminar elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <md-dialog-confirm
      :md-active.sync="activo"
      md-title="Atencion"
      md-content="¿Esta seguro que desea eliminar el registro?"
      md-cancel-text="Cancelar"
      md-confirm-text="Aceptar"
      @md-cancel="activo = false"
      @md-confirm="confirmarEliminar(seleccionadoTemp)" />
    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!----------------------------- Modal de mensaje de error al crear, Editar o eliminar elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <md-dialog-alert
      :md-active.sync="hayError"
      md-title="Error"
      :md-content="mensajeError"
      md-confirm-text="Ok" />
    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!----------------------------- Modal de formulario de creacion de elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!-- <md-dialog :md-active.sync="estaCreando">      
      <md-dialog-title>Nuevo registro</md-dialog-title>
      <vue-form :state="formState" @submit.prevent="confirmarAgregar()">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="container">
                <md-field>
                  <validate tag="div">
                    <label>Id Usuario</label>
                    <md-input  maxlength="1" name="id_usuario" id="id_usuario" v-model="formData.id_estado" required/>      
                  </validate>
                </md-field>
                <md-field>
                  <validate tag="div">
                    <label >Descripcion</label>
                    <md-input maxlength="30" name="descripcion" id="descripcion" v-model="formData.descripcion" required/>
                  </validate>
                </md-field>
              </div>
            </div>
          </md-card-content>
        </md-card>
        <md-dialog-actions>
          <md-button type="submit" class="md-raised md-primary" :disabled="formState.$invalid">Agregar</md-button>
          <md-button class="md-primary" @click="estaCreando = false">Cancelar</md-button>
        </md-dialog-actions>
      </vue-form>
    </md-dialog> -->
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
      this.estaSeleccionado = false
      this.estaEditando = false
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
        seleccionado: {},
        estaSeleccionado: false,
        claseCard: 'md-layout-item md-size-100 md-small-size-100',
        estaEditando: false,
        seleccionadoTemp: {},
        activo: false,
        estaCreando: false,
        hayError: false,
        mensajeError: '',
        cargando: true
      }
    },
    methods: {
      // activa modal de creacion de elemento
      mostrarNuevo(){
        this.estaCreando = true
        this.formData = this.getDatosIniciales()
      },

      // metodo que trae todos los elementos
      getUsuarios() {
        this.axios.get(url.url + url.urlUsuarios, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
          })
        .then( res => {         
          this.buscados = res.data 
          this.usuarios = res.data
          this.cargando = false
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
        this.seleccionado = item
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
