<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-center">
      <vue-form :state="formState" @submit.prevent="enviar()">
        <md-card class="md-layout-item md-elevation-12 eze">
          <md-card-header>
            <div class="md-title">NovaGaming</div>
            <div class="md-body-1">Para que comprar mañana lo que puedes comprar hoy.</div>
          </md-card-header>

          <md-card-content>
            <md-field>
              <label for="usuario">Email</label>
              <md-input
                type="email"
                name="usuario"
                id="usuario"
                v-model="formData.usuario"
                @click="limpiarMensaje"
              />
            </md-field>

            <md-field>
              <label for="password">Password</label>
              <md-input
                type="password"
                name="password"
                id="password"
                v-model="formData.password"
                @click="limpiarMensaje"
              />
            </md-field>
          </md-card-content>

          <div class="loading-overlay" v-if="cargando">
            <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
          </div>

          <div v-if="error" class="alert alert-danger">Usuario o clave incorrecta</div>

          <md-card-actions class="d-flex justify-content-center">
            <md-button type="submit" class="max">Login</md-button>
          </md-card-actions>

          <md-card-actions class="d-flex justify-content-center">
            ¿Aún no tenés cuenta?
            <md-button class="max">Registrarme</md-button>
          </md-card-actions>
        </md-card>
      </vue-form>
    </div>
  </div>
</template>

<script lang="js">

  import url from '../urls.js'

  export default  {
    name: 'src-components-login',
    props: [],
    mounted () {

    },
    data () {
      return {
        formState: {},
        formData: this.getDatosIniciales(),
        error: false,
        cargando: false
      }
    },
    methods: {
      getDatosIniciales(){
        return {
          usuario: '',
          password: ''
        }
      },
      limpiarMensaje(){
        this.error = false
      },

      enviar() {
        this.cargando = true
        this.axios.post(url.url + url.urlLogin, this.formData, {
          'content-type' : 'application/json'
        })
        .then( res => {
          this.cargando = false
          if (res.data.estado == 400){
            this.error = true
          }
          else{
            localStorage.setItem('token', JSON.stringify(res.data.token))
            if(res.data.perfil == 'S'){
              localStorage.setItem('perfil', JSON.stringify(res.data.perfil))
            }
            this.$store.dispatch('login', {'token': localStorage.getItem('token'), 'perfil': localStorage.getItem('perfil')})
            this.$router.push({path: '/productos'})
          }
        })
          
        .catch(error => {
          console.log('ERROR POST', error)
        })
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.src-components-login {
}
.eze {
  background: darkgray;
}
</style>
