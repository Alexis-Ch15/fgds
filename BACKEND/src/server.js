//Requerir módulos
import express from 'express'
import dotenv from "dotenv"
import router from './routers/veterinario_routes.js'
import cors from 'cors'

//Inicializaciones
const app = express()
//Configuraciones
dotenv.config()
//Middlewares
app.use(express.json())

app.use(cors())//revisar el cors
//Variables globales
app.set("port",process.env.PORT || 3000)

//Rutas
app.get("/",(req,res)=>{
    res.send("Bienvenidos a la api veterinarios")
})
app.use("/api",router)

//Exporta la instancia de express por medio de app
export default app