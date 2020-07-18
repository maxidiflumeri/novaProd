import crearServidor from './src/config/server.js'
import config from './src/config/config.js'
import express from 'express'


const app = crearServidor()
app.use(express.static('public/cliente/dist'))
const server = app.listen(process.env.PORT || config.PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en http://${config.HOST}:${config.PORT}`)
})