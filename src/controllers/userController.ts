import { request, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/user.model'
class UserController {
    constructor() {
    }
    public async create(req: Request, res: Response): Promise<void> {
        const { nombre, correo, contra, telefono,img } = req.body;
        try {
            const hashPassword = await bcrypt.hash(contra, 10)
            const nuevoUsuario = new Usuario(
                {
                    nombre:nombre,
                    correo:correo,
                    contra: hashPassword,
                    telefono:telefono,
                    img:img
                })
            const usuarioGuardado = await nuevoUsuario.save();
            //const token = await createAccesToken({ id: usuarioGuardado._id });
            //res.cookie('token', token);
            res.json(
                {
                    id: usuarioGuardado._id,
                    nombre: usuarioGuardado.nombre,
                    correo: usuarioGuardado.correo,
                    telefono: usuarioGuardado.telefono,
                    img: usuarioGuardado.img,
                    createAt:usuarioGuardado.createdAt,
                    updateAt:usuarioGuardado.updatedAt
                })
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    public async list(req: Request, res: Response): Promise<void> {
        console.log("Mostrando todos usuario");
        const usuarios = await Usuario.find()
        res.json(usuarios)
    }
    public async listOne(req: Request, res: Response): Promise<void>{
        const usuario = await Usuario.findById(req.params.id)
        res.json(usuario)
    }
    public async delete(req: Request, res:Response): Promise <void>{
        const user = await Usuario.findByIdAndDelete(req.params.id)
        res.json(Usuario)
    }
    public async nuevaContra(req : Request, res: Response){

    }
    public async validarUsuario(req : Request, res: Response){
        
    }
    public async validarCorreo(req : Request, res: Response){
        
    }
    public async update(req : Request, res: Response){
        
    }
    public async listUserRol(req : Request, res: Response){
        
    }
    public async historial(req : Request, res: Response){
        
    }


}

export const userController = new UserController();