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
exports.userController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../database"); //acceso a la base de datos
const user_model_1 = __importDefault(require("../models/user.model"));
class UserController {
    constructor() {
        (0, database_1.connectDB)();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, correo, contra, telefono, img } = req.body;
            try {
                const hashPassword = yield bcryptjs_1.default.hash(contra, 10);
                const nuevoUsuario = new user_model_1.default({
                    nombre: nombre,
                    correo: correo,
                    contra: hashPassword,
                    telefono: telefono,
                    img: img
                });
                const usuarioGuardado = yield nuevoUsuario.save();
                //const token = await createAccesToken({ id: usuarioGuardado._id });
                //res.cookie('token', token);
                res.json({
                    id: usuarioGuardado._id,
                    nombre: usuarioGuardado.nombre,
                    correo: usuarioGuardado.correo,
                    telefono: usuarioGuardado.telefono,
                    img: usuarioGuardado.img,
                    createAt: usuarioGuardado.createdAt,
                    updateAt: usuarioGuardado.updatedAt
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando todos usuario");
            const usuarios = yield user_model_1.default.find();
            res.json(usuarios);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield user_model_1.default.findById(req.params.id);
            res.json(usuario);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByIdAndDelete(req.params.id);
            res.json(user_model_1.default);
        });
    }
}
exports.userController = new UserController();
