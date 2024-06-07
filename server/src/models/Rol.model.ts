import mongoose, { Schema, Model } from 'mongoose';

interface Rol {
    nombre : string;
    name: string;
    descripcion: string;
    description: string;
    createdAt:Date;
    updatedAt:Date;
    rol:Rol;
}
const schemaRol = new Schema<Rol>({
    nombre:
    {
        type: String,
        required: true,
        trim: true
    },
    name:
    {
        type: String,
        required: true,
        trim: true,
    },
    descripcion:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required:true
    },
},
    {
        timestamps: true
    }
)
export default mongoose.model('Rol', schemaRol);