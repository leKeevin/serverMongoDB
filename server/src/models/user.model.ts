import mongoose, { Schema, Model } from 'mongoose';
interface Usuario {
    nombre : string;
    correo: string;
    contra: string;
    telefono: string;
    img: Number;
    createdAt:Date;
    updatedAt:Date;
    id_rol:any;
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
    },
    id_rol:{  
        type: Schema.Types.ObjectId,
        ref: 'Rol' ,
        require:true

    }
},
    {
        timestamps: true
    }
)
export default mongoose.model('Usuario', schemaUsuario);