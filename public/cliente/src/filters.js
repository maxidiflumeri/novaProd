import Vue from  'vue'

Vue.filter('formatearFecha', function(value) {
    let fecha = value.substr(8,2)+"/"+value.substr(5,2)+"/"+value.substr(0,4)+" "+value.substr(11,8)
    return fecha
})