import {Request,Response} from 'express';
import Rol from '../models/Rol.model';

class RolController
{
    public async create(req : Request, res: Response){
        let resp = await Rol.create(req.body);
        res.json(resp);      
    }
    public async update(req : Request, res: Response){
        let resp = await Rol.findByIdAndUpdate(req.params.id,req.body);
        res.json(resp); 
    }
    public async delete(req : Request, res: Response){
        let resp = await Rol.findByIdAndDelete(req.params.id);
        res.json(resp); 
    }
    public async list(req : Request, res: Response){
        let resp = await Rol.find();
        res.json(resp); 
    }
    public async listOne(req : Request, res: Response){
        let resp = await Rol.findById(req.params.id);
        res.json(resp); 
    }   
}

export const rolController = new RolController();