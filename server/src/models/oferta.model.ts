import mongoose, { Schema } from "mongoose";

interface Oferta {
    nombre: string,
    name: string,
    fecha_inicio: Date,
    fecha_fin: Date,
    createdAt: Date,
    updatedAt: Date
}

const schemaOferta = new Schema<Oferta>({
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
        trim: true
    },
    fecha_inicio:
    {
        type: Date,
        required: true
    },
    fecha_fin:
    {
        type: Date,
        required: true
    }
},
    {
        timestamps: true
    })

export default mongoose.model('Oferta', schemaOferta);