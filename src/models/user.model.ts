import mongoose, { Schema, Model } from 'mongoose';

interface Usuario {
    nombre : string;
    correo: string;
    contra: string;
    telefono: string;
    img: Number;
    createdAt:Date;
    updatedAt:Date;
}
const schemaUsuario = new Schema<Usuario>({
    nombre:
    {
        type: String,
        required: true,
        trim: true
    },
    correo:
    {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contra:
    {
        type: String,
        required: true
    },
    telefono:
    {
        type: String,
        required:true
    },
    img:{
       type: Number,
       required: true 
    }
},
    {
        timestamps: true
    }
)
export default mongoose.model('Usuario', schemaUsuario);