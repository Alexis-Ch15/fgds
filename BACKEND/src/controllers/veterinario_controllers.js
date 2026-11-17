import Veterinario from "../models/Veterinario.js"

//Esto no es de una libreria
const registro=async(req,res)=>{
    try{
        //PASO1 Obtener la respuesta
        const{email,password}=req.body
        //PASO2 Validar los campos
        if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Los sentimos,debes llenar todos los campos"})
        const verificarEmailBDD = await Veterinario.findOne({email})//Traer de la BBD, usar el metodo findOne tengo que usar un await
        if(verificarEmailBDD) return res.status(400).json({msg:"Los sentimos, el email ya se encuentra registrado"})
        
        //PASO 3 Logica
        const nuevoVeterinario = new Veterinario(req.body)
        nuevoVeterinario.password = await nuevoVeterinario.encryptPassword(password)
        await nuevoVeterinario.save()
        res.status(201).json({msg:"Registro Exitosos"})
        //Paso 4 Respuesta

    }catch(error){
        console.log(error)
    }
}

export { registro}
//export nomabrado