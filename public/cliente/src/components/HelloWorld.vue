<template>
  <div>
    <div>
      <small>Regular</small>
      <md-button class="md-fab">
        <md-icon>menu</md-icon>       
      </md-button>
      <md-button class="md-fab md-primary">
        <md-icon>add</md-icon>
      </md-button>
      <md-button class="md-fab md-plain">
        <md-icon>edit</md-icon>
      </md-button>
    </div>

    <div>
      <small>Mini/Dense</small>
      <md-button class="md-fab md-mini">
        <md-icon>menu</md-icon>
      </md-button>
      <md-button class="md-fab md-mini md-primary">
        <md-icon>add</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>edit</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
const url = process.env.NODE_ENV === 'production'? '': 'http://localhost:3000'
export default {
  mounted(){
    this.axios.get(url + '/api/usuarios')
    .then(res => {         
      console.log(res.data)      
    })
    .catch(error => {
        console.log('ERROR GET', error)
    })

  },
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
