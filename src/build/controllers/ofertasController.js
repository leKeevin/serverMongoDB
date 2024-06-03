"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofertasController = void 0;
const database_1 = require("../database");
const oferta_model_1 = __importDefault(require("../models/oferta.model"));
class OfertasController {
    constructor() {
        (0, database_1.connectDB)();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, name, fecha_inicio, fecha_fin } = req.body;
            // Se convierten las fechas de DD-MM-YYYY a notación YYYY-MM-DD
            // Si se cambian los text fields por un datepicker se puede borrar esto
            const partes_ini = fecha_inicio.split('-');
            const new_fecha_ini = partes_ini[2] + "-" + partes_ini[1] + "-" + partes_ini[0];
            const partes_fin = fecha_fin.split('-');
            const new_fecha_fin = partes_fin[2] + "-" + partes_fin[1] + "-" + partes_fin[0];
            try {
                const nuevaOferta = new oferta_model_1.default({
                    nombre: nombre,
                    name: name,
                    fecha_inicio: new Date(new_fecha_ini),
                    fecha_fin: new Date(new_fecha_fin)
                });
                const ofertaGuardada = yield nuevaOferta.save();
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
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ofertas = yield oferta_model_1.default.find();
            res.json(ofertas);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const oferta = yield oferta_model_1.default.findById(req.params.id);
            res.json(oferta);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const oferta = yield oferta_model_1.default.findByIdAndDelete(req.params.id);
            res.json(oferta);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const oferta = yield oferta_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(oferta);
        });
    }
    ofertasActivas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ofertas = yield oferta_model_1.default.find({ fecha_inicio: { $lte: new Date() }, fecha_fin: { $gte: new Date() } });
            res.json(ofertas);
        });
    }
    numOfertasActivas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const num = yield oferta_model_1.default.countDocuments({ fecha_inicio: { $lte: new Date() }, fecha_fin: { $gte: new Date() } });
            res.json({ num_ofertas_activas: num });
        });
    }
    duracionOfertas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ofertas = yield oferta_model_1.default.find();
            let respuesta = [];
            for (let i = 0; i < ofertas.length; i++) {
                respuesta.push({ "Nombre_Oferta": ofertas[i].nombre, "Duracion_En_Dias": Math.round(Math.abs((ofertas[i].fecha_fin.getTime() - ofertas[i].fecha_inicio.getTime()) / (24 * 60 * 60 * 1000))) });
            }
            res.json(respuesta);
        });
    }
    ordenarFechaInicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ofertas = yield oferta_model_1.default.find().sort({ fecha_inicio: 'desc' });
            res.json(ofertas);
        });
    }
}
exports.ofertasController = new OfertasController();
