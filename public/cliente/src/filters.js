import Vue from  'vue'

Vue.filter('formatearFecha', function(value) {
    let fecha = value.substr(8,2)+"/"+value.substr(5,2)+"/"+value.substr(0,4)
    return fecha
})

Vue.filter('primeraMayuscula', function(value){
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    
})

Vue.filter('MayusculaEnSeparados', function(value){
    let espacio = value.indexOf(" ")
    console.log(espacio)
    if(espacio != -1){
        let palabra1 = value.substr(0,espacio)
        let palabra2 = value.substr(espacio+1,value.length)
        return palabra1.charAt(0).toUpperCase() + palabra1.slice(1).toLowerCase() + " " 
                + palabra2.charAt(0).toUpperCase() + palabra2.slice(1).toLowerCase() 
        
    }else{
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }    
    
})