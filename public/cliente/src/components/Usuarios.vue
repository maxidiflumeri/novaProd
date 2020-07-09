<template>
  <div class="container-fluid mt-3">
    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!------------------------- Creacion de la tabla que muestra los resultados ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div v-if="cargando" class="loading-overlay d-flex justify-content-center">
      <md-progress-spinner class="colorSpinner" md-mode="indeterminate" :md-diameter="50" :md-stroke="5"></md-progress-spinner>
    </div>
    <div v-else>
      <md-table v-model="buscados" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onSelect">
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

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
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
                  <div class="col-lg-3">
                    <md-field>
                      <label>Id Usuario</label>
                      <md-input name="id_usuario" id="id_usuario" v-model="seleccionadoTemp.id_usuario" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-5">
                    <md-field>
                      <label>Nombre</label>
                      <md-input name="nombre" id="nombre" v-model="seleccionadoTemp.nombre" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <label>Apellido</label>
                      <md-input name="apellido" id="apellido" v-model="seleccionadoTemp.apellido" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                </div>
                <!--Linea 2-->
                <div class="row">
                  <div class="col-lg-4">
                    <md-field>
                      <label>Fecha Nacimiento</label>
                      <md-input name="fecha_nacimiento" id="fecha_nacimiento" v-model="seleccionadoTemp.fecha_nacimiento" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>Correo Electrónico</label>
                      <md-input name="correo" id="correo" v-model="seleccionadoTemp.correo" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-1">
                    <md-field>
                      <label>Sexo</label>
                      <md-input name="sexo" id="sexo" v-model="seleccionadoTemp.sexo" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-1">
                    <md-field>
                      <label>Admin</label>
                      <md-input name="administrador" id="administrador" v-model="seleccionadoTemp.administrador" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                </div>
                <!--BOTONERA CARD-->
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
                <!--BOTONERA TELEFONOS Y DIRECCIONES-->
                <div class="row">
                  <div class="ml-4">
                    <md-button class="md-fab md-mini bg-primary" @click="mostrarTelefonos()">
                      <md-icon>phone</md-icon>                    
                    </md-button>
                    <md-button class="md-fab md-mini bg-primary" @click="mostrarDirecciones()">
                      <md-icon>home</md-icon>                    
                    </md-button>
                  </div>
                </div>

                <!--Card de Telefonos-->
                <div v-if="habilitarTelefonos">
                  <div class="row d-flex justify-content-center" v-for="(telefono, index) in this.telefonos" :key="index">
                    <div class="col-lg-5">
                      <md-field>
                        <label>Telefono</label>
                        <md-input name="telefono" id="telefono" :value="telefono.TELEFONO" :disabled="!estaEditandoTelefono" />
                      </md-field>
                    </div>
                    <div class="col-lg-5">
                      <md-field>
                        <label>Descripcion</label>
                        <md-input name="sexo" id="sexo" :value="telefono.DESCRIPCION" :disabled="!estaEditandoTelefono" />
                      </md-field>
                    </div>
                    <div class="col-lg-2 mt-4">
                      <md-button class="md-icon-button md-dense" @click="habilitarEdicionTelefono(index)">
                        <md-icon class="text-warning">edit</md-icon>                    
                      </md-button>
                      <md-button class="md-icon-button md-dense md-plain" @click="activo = true" >
                        <md-icon class="text-danger">delete</md-icon>                    
                      </md-button>
                    </div>
                  </div>
                </div>
                <div v-if="habilitarDirecciones && habilitarTelefonos">
                    <hr>
                  </div>
                <!--Card de Direcciones-->
                <div v-if="habilitarDirecciones">
                  <div v-for="(direccion, index) in this.direcciones" :key="index">
                    <div class="row d-flex justify-content-center">
                      <div class="col-lg-5">
                        <md-field>
                          <label>Calle</label>
                          <md-input name="calle" id="calle" :value="direccion.CALLE" :disabled="!estaEditando" />
                        </md-field>
                      </div>
                      <div class="col-lg-3">
                        <md-field>
                          <label>Nro</label>
                          <md-input name="nro" id="nro" :value="direccion.NUMERO" :disabled="!estaEditando" />
                        </md-field>
                      </div>
                      <div class="col-lg-2">
                        <md-field>
                          <label>Piso</label>
                          <md-input name="piso" id="piso" :value="direccion.PISO" :disabled="!estaEditando" />
                        </md-field>
                      </div>
                      <div class="col-lg-2">
                        <md-field>
                          <label>Dpto</label>
                          <md-input name="dpto" id="dpto" :value="direccion.DEPARTAMENTO" :disabled="!estaEditando" />
                        </md-field>
                      </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                      <div class="col-lg-2">
                        <md-field>
                          <label>CP</label>
                          <md-input name="cp" id="cp" :value="direccion.CP" :disabled="!estaEditando" />
                        </md-field>
                      </div>
                      <div class="col-lg-4">
                        <md-field>
                          <label>Localidad</label>
                          <md-input name="localidad" id="localidad" :value="direccion.LOCALIDAD" :disabled="!estaEditando" />
                        </md-field>
                      </div>
                      <div class="col-lg-4">
                        <md-field>
                          <label>Provincia</label>
                          <md-input name="provincia" id="provincia" :value="direccion.PROVINCIA" :disabled="!estaEditando" />
                        </md-field>
                      </div>
                      <div class="col-lg-2 mt-4">
                      <md-button class="md-icon-button md-dense" @click="habilitarEdicion()">
                        <md-icon class="text-warning">edit</md-icon>                    
                      </md-button>
                      <md-button class="md-icon-button md-dense md-plain" @click="activo = true" >
                        <md-icon class="text-danger">delete</md-icon>                    
                      </md-button>
                    </div>
                    </div>
                  </div>
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
        cargando: true,
        habilitarTelefonos: false,
        estaEditandoTelefono: false,
        telefonos: [],
        direcciones: [],
        habilitarDirecciones: false
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

      // buscador de elemento en la tabla
      buscarEnTabla () {
        this.buscados = buscarPorNombre(this.usuarios, this.busqueda)
      },

      // seleccion de un elemento de la tabla que muestra el card con el detalle del elemento
      onSelect (item) {
        if(item){
          this.seleccionadoTemp = {
            id_usuario: item.ID_USUARIO,
            nombre: item.NOMBRE,
            apellido: item.APELLIDO,
            fecha_nacimiento: this.formatearFecha(item.FECHA_NACIMIENTO),
            correo: item.CORREO,
            sexo: item.SEXO,
            administrador: item.ADMINISTRADOR
          } 
          this.seleccionado = item          
          this.estaSeleccionado = true
          this.estaEditando = false
          this.claseCard = 'md-layout-item md-size-100 md-small-size-100' 
        }else{
          this.estaSeleccionado = false
          this.estaEditando = false
        }    
      },

      //Formatea la fecha para mostar en la card
      formatearFecha(fecha){
        if(fecha){
          let fechaOk = fecha.substr(8,2)+"/"+fecha.substr(5,2)+"/"+fecha.substr(0,4)
          return fechaOk
        }
        return fecha
      },

      // habilita el card para la edición del elemento
      habilitarEdicion(){          
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100 color' 
        this.estaEditando = true
      },
      
      // cancela la edición del elemento
      cancelarEdicion(){
        this.estaEditando = false
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100' 
        this.seleccionadoTemp = this.seleccionado   
        this.estaSeleccionado = false      
      },

      // metodo que modifica el elemento
      confirmarEdicion(usuarioPut){        
        this.axios.put(url.url + url.urlUsuarios + '/'+ this.seleccionado.ID_USUARIO, usuarioPut, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            if(res.data.estado == 200){
              this.getUsuarios()
            }else{
              console.log(res.data)
              this.hayError = true
              this.mensajeError = res.data.mensaje || 'No se pudo realizar la operación'
            }      
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
        this.estaEditando = false
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100 color' 
      },

      // metodo que elimina el elemento
      confirmarEliminar(usuarioDel){
        this.axios.delete(url.url + url.urlUsuarios + '/'+ usuarioDel.id_usuario, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            if(res.data.estado == 200){
              this.getEstados()
            }else{
              console.log(res.data)
              this.hayError = true
              this.mensajeError = res.data.mensaje || 'No se pudo realizar la operación'
            }                      
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })

      },

      //habilita la vista de telefonos
      mostrarTelefonos(){
        this.habilitarTelefonos = !this.habilitarTelefonos
        this.getTelefonos()
        
      },

      //Metodo que trae todos los telefonos del usuario seleccionado
      getTelefonos(){
        this.axios.get(url.url + url.urlTelefonos + "?idUsuario=" + this.seleccionado.ID_USUARIO, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
          })
        .then( res => {         
          this.telefonos = res.data
           console.log(this.telefonos)
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },

      //metodo que habilita la edicion de un telefono
      habilitarEdicionTelefono(index){
        console.log(index)
        this.estaEditandoTelefono = true
      },

      //habilita la vista de direcciones
      mostrarDirecciones(){
        this.habilitarDirecciones = !this.habilitarDirecciones
        this.getDirecciones()
        
      },

      //
      getDirecciones(){
        this.axios.get(url.url + url.urlDirecciones + "?idUsuario=" + this.seleccionado.ID_USUARIO, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
          })
        .then( res => {         
          this.direcciones = res.data
           console.log(this.direcciones)
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .color{
  background: grey;;
 
}
</style>
