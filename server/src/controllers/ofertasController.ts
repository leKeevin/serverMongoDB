import { Request, Response } from 'express';
import { connectDB } from '../database';
import Oferta from '../models/oferta.model';

class OfertasController {


    public async create(req: Request, res: Response): Promise<void> {
        const { nombre, name, fecha_inicio, fecha_fin } = req.body;

        // Se convierten las fechas de DD-MM-YYYY a notación YYYY-MM-DD
        // Si se cambian los text fields por un datepicker se puede borrar esto
        const partes_ini = fecha_inicio.split('-');
        const new_fecha_ini = partes_ini[2] + "-" + partes_ini[1] + "-" + partes_ini[0];
        const partes_fin = fecha_fin.split('-');
        const new_fecha_fin = partes_fin[2] + "-" + partes_fin[1] + "-" + partes_fin[0];

        try {
            const nuevaOferta = new Oferta(
                {
                    nombre: nombre,
                    name: name,
                    fecha_inicio: new Date(new_fecha_ini),
                    fecha_fin: new Date(new_fecha_fin)
                }
            );
            const ofertaGuardada = await nuevaOferta.save();
            res.json({
                id: ofertaGuardada._id,
                nombre: ofertaGuardada.nombre,
                name: ofertaGuardada.name,
                fecha_inicio: ofertaGuardada.fecha_inicio,
                fecha_final: ofertaGuardada.fecha_fin,
                createdAt: ofertaGuardada.createdAt,
                updatedAt: ofertaGuardada.updatedAt
            });
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async list(req: Request, res: Response): Promise<void> {
        const ofertas = await Oferta.find();
        res.json(ofertas);
    }

    public async listOne(req: Request, res: Response): Promise<void> {
        const oferta = await Oferta.findById(req.params.id);
        res.json(oferta);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const oferta = await Oferta.findByIdAndDelete(req.params.id);
        res.json(oferta);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const oferta = await Oferta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(oferta);
    }

    public async ofertasActivas(req: Request, res: Response): Promise<void> {
        const ofertas = await Oferta.find({ fecha_inicio: { $lte: new Date() } , fecha_fin: { $gte: new Date() } });
        res.json(ofertas);
    }

    public async numOfertasActivas(req: Request, res: Response): Promise<void> {
        const num = await Oferta.countDocuments({ fecha_inicio: { $lte: new Date() }, fecha_fin: { $gte: new Date() } });
        res.json({ num_ofertas_activas: num });
    }

    public async duracionOfertas(req: Request, res: Response): Promise<void> {
        const ofertas = await Oferta.find();
        let respuesta = []
        for (let i = 0; i < ofertas.length; i++) {
            respuesta.push({ "Nombre_Oferta": ofertas[i].nombre, "Duracion_En_Dias": Math.round(Math.abs((ofertas[i].fecha_fin.getTime() - ofertas[i].fecha_inicio.getTime()) / (24 * 60 * 60 * 1000))) });
        }
        res.json(respuesta);
    }

    public async ordenarFechaInicio(req: Request, res: Response): Promise<void> {
        const ofertas = await Oferta.find().sort({ fecha_inicio: 'desc' });
        res.json(ofertas);
    }

    /*public async listAll_Ofertas_Producto(req: Request, res: Response): Promise<void> {
        const ofertas = await Oferta.find();

    }*/
}
export const ofertasController = new OfertasController();