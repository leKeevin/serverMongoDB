import mongoose from 'mongoose'
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/carniceria');
        //await mongoose.connect('mongodb://127.0.0.1/carniceria');
        console.log("Base de datos conectada");
    }
    catch (error) {
        console.log(error);
    }
}