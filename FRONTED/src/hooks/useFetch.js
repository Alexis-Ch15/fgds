import axios from "axios"
import { useState } from "react"
import {toast} from "react-toastify"
//creacion del hook personalizado
export function useFetch(){
    //Crear el login
    const [loading,setLoading] = useState(false)// aun no preceso una solicitud
    const fetchDataBackend = async(url, data=null, method= "GET", headers={}) => {
        //Aviso de procesamiento
        const loadingToast = toast.loading("Procesando solicitud")//habilitar el mensaje
        setLoading(true)//cambiando de valor aexitoso
    try {
       const response = await axios({
            method,
            url,
            headers:{
            "Content-Type":"application/json",
            ...headers,
            }
            ,data
        })
        toast.dismiss(loadingToast)
        toast.success(response?.data?.msg)
        return response?.data
        } catch (error) {
            toast.dismiss(loadingToast)
            toast.error(error.response?.data?.msg || "Ocurrio un error inesperado") 
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return {fetchDataBackend,loading}
}