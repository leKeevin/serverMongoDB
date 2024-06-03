import mongoose, { Schema, Model } from 'mongoose';

interface Producto{
    nombre: string,
    name:   string,
    cantidad:Number,
    animal: string,
    animal_eng:string,
    precio: Number,
    descripcion: string,
    description: string,
    fotito:Number,
    oferta:boolean,
}
const schemaProducto = new Schema<Producto>({
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
    cantidad:
    {
        type: Number,
        required: true
    },
    animal:
    {
        type: String,
        required:true,
        trim:true
    },
    animal_eng:{
       type: String,
       required: true,
       trim:true 
    },
    precio:{
        type:Number,
        required: true
    },
    descripcion:{
        type: String,
        required:true,
        trim:true
    },
    description:{
        type: String,
        required:true,
        trim:true
    },
    fotito:{
        type:Number,
        required:true
    },
    oferta:{
        type:Boolean
    }
    

},
    {
        timestamps: true
    }
)
export default mongoose.model('Producto', schemaProducto);