import { request, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/user.model'
class UserController {
    public async create(req: Request, res: Response): Promise<void> {
        const { nombre, correo, contra, telefono, img } = req.body;
        try {
            const hashPassword = await bcrypt.hash(contra, 10)
            const nuevoUsuario = new Usuario(
                {
                    nombre: nombre,
                    correo: correo,
                    contra: hashPassword,
                    telefono: telefono,
                    img: img

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
                    createAt: usuarioGuardado.createdAt,
                    updateAt: usuarioGuardado.updatedAt
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
    public async listOne(req: Request, res: Response): Promise<void> {
        const usuario = await Usuario.findById(req.params.id)
        res.json(usuario)
    }
    public async delete(req: Request, res: Response): Promise<void> {
        const user = await Usuario.findByIdAndDelete(req.params.id)
        res.json(Usuario)
    }
    public async nuevaContra(req: Request, res: Response) {
        const { correo, contra } = req.body;
        const salt = await bcrypt.genSalt(10);
        let clave = await bcrypt.hash(req.body.contra, salt);
        let resp = await Usuario.findOneAndUpdate(
            {
                correo: correo
            },
            {
                contra: clave
            }
        );
        res.json(resp);
    }
    public async validarUsuario(req: Request, res: Response) {
        const { correo, contra } = req.body;
        let resp = await Usuario.find({ correo: correo });
        if (resp.length > 0) {

            console.log(resp[0].id);
            console.log(resp[0].id_rol);

            let qqq = await bcrypt.compare(contra, resp[0].contra);
            console.log(qqq);

            if (qqq) {
                console.log("la contra es valida");
                
                res.json(resp[0]);
                return;
            }
            else {
                console.log("la contra NO es valida");
                // -1 si la contraseña no es válida
                res.json({ "id": -1 })
            }
        }
        else
            // -2 si no existe el usuario
            res.json({ "id": -2 })
    }
    public async validarCorreo(req: Request, res: Response) {
        const correopar = req.body.correo;
        const respuesta = await Usuario.find(
            { correo: correopar },
            {
                _id: 0,
                correo_existe: {
                    $cond: {
                        if: { $eq: ["$correo", correopar] },
                        then: 1,
                        else: 0
                    }
                }
            }
        );


        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Usuario no encontrado' });
    }
    public async update(req: Request, res: Response) {
        let resp = await Usuario.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        res.json(resp);
    }
    public async listUserRol(req: Request, res: Response) {
        let resp = await Usuario.aggregate([{
            $lookup: {
                from: "rol",
                localField: "_id",
                foreignField: "id_rol",
                as: "Rol"
            }
        }
    ]);
        res.json(resp);
    }
    public async historial(req: Request, res: Response) {
        
    }


}

export const userController = new UserController();