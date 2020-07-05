<template>
  <vue-form :state="formState" @submit.prevent="enviar()">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">NovaGaming</div>
        <div class="md-body-1">Para que comprar mañana lo que puedes comprar hoy.</div>
      </md-card-header>

      <md-card-content>
        <md-field>
          <label for="usuario">Email</label>
          <md-input type="email" name="usuario" id="usuario" v-model="formData.usuario"/>
        </md-field>

        <md-field>
          <label for="password">Password</label>
          <md-input type="password" name="password" id="password" v-model="formData.password"/>
        </md-field>
      </md-card-content>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

      <md-card-actions>
        <md-button class="md-primary ">Registrarme</md-button>
      </md-card-actions>

      <md-card-actions>
        <md-button type="submit" class="md-primary">Login</md-button>
      </md-card-actions>
    </md-card>
  </vue-form>
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
        loading: false,
        formState: {},
        formData: this.getDatosIniciales()
      }
    },
    methods: {
      getDatosIniciales(){
        return {
          usuario: '',
          password: ''
        }
      },

      enviar() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 5000);
        this.axios.post(url.url + url.urlLogin, this.formData, {
          'content-type' : 'application/json'
        })
        .then( res => {
          localStorage.setItem('token', JSON.stringify(res.data.token))
          if(res.data.perfil == 'S'){
            localStorage.setItem('perfil', JSON.stringify(res.data.perfil))
          }
          this.$store.dispatch('login', {'token': localStorage.getItem('token'), 'perfil': localStorage.getItem('perfil')})

          this.$router.push({path: '/productos'})
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
</style>
