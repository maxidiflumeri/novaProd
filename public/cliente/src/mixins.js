import Vue from "vue";

var miMixin = {
    mounted (){
        this.$store.dispatch('login', {'token': localStorage.getItem('token'), 'perfil': localStorage.getItem('perfil')})
    }
}

Vue.mixin(miMixin)