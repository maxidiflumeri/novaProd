import Vue from "vue"

var miMixin = {
    
    mounted (){
        this.$store.dispatch('login', {'token': localStorage.getItem('token'), 'perfil': localStorage.getItem('perfil')})
    },
    methods: {
        //Formatea la fecha para mostar en la card      
        formatearFecha(fecha){
            if(fecha){
                let fechaOk = fecha.substr(8,2)+"/"+fecha.substr(5,2)+"/"+fecha.substr(0,4)
                return fechaOk
            }
            return fecha
            },
    }
}

Vue.mixin(miMixin)