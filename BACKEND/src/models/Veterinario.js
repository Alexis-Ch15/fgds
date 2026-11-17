import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import { randomBytes } from 'node:crypto';
const { Schema,model } = mongoose;

const veterinarioSchema = new Schema({
  nombre:{
    type:String,
    required:true,
    trim:true
  },
  apellido:{
    type:String,
    required:true,
    trim:true
  },
  direccion:{
    type:String,
    trim:true,
    default:null
  },
   celular:{
    type:String,
    trim:true,
    default:null
  },
  email:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  status:{
    type:Boolean,
    default:true,
  },
  token:{
    type:String,
    default:null
  },
  confirmEmail:{
    type:Boolean,
    default:false
  },
  rol:{
    type:String,
    default:"veterinario"
  }

},{timestamps:true})

//Método para cifrara el password
veterinarioSchema.methods.encryptPassword = async function(passwordUser){
    const salt = await bcrypt.genSalt(10);
    const passwordEncryp = await bcrypt.hash(passwordUser, salt);
    return passwordEncryp;
}
//metodo para verificar si el password es el mismo de la bbd
veterinarioSchema.methods.matchPassword = async function(passwordUser){
    await bcrypt.compare(passwordUser, this.password); // true //compare de la libreria
}
//metodo  para crear un token(OTP) para el correo no JWT
veterinarioSchema.methods.createToken = function(){
    const tokenGenerado = randomByte(2).toString('hex').toUpperCase()
    this.token = tokenGenerado
    return tokenGenerado
}




export default mongoose.model('Veterinario', veterinarioSchema);