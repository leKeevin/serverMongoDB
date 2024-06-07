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
const user_model_1 = __importDefault(require("../models/user.model"));
class UserController {
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
    nuevaContra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, contra } = req.body;
            const salt = yield bcryptjs_1.default.genSalt(10);
            let clave = yield bcryptjs_1.default.hash(req.body.contra, salt);
            let resp = yield user_model_1.default.findOneAndUpdate({
                correo: correo
            }, {
                contra: clave
            });
            res.json(resp);
        });
    }
    validarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, contra } = req.body;
            let resp = yield user_model_1.default.find({ correo: correo });
            if (resp.length > 0) {
                console.log(resp[0].id);
                console.log(resp[0].id_rol);
                let qqq = yield bcryptjs_1.default.compare(contra, resp[0].contra);
                console.log(qqq);
                if (qqq) {
                    console.log("la contra es valida");
                    res.json(resp[0]);
                    return;
                }
                else {
                    console.log("la contra NO es valida");
                    // -1 si la contraseña no es válida
                    res.json({ "id": -1 });
                }
            }
            else
                // -2 si no existe el usuario
                res.json({ "id": -2 });
        });
    }
    validarCorreo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const correopar = req.body.correo;
            const respuesta = yield user_model_1.default.find({ correo: correopar }, {
                _id: 0,
                correo_existe: {
                    $cond: {
                        if: { $eq: ["$correo", correopar] },
                        then: 1,
                        else: 0
                    }
                }
            });
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Usuario no encontrado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield user_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(resp);
        });
    }
    listUserRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield user_model_1.default.aggregate([{
                    $lookup: {
                        from: "rol",
                        localField: "_id",
                        foreignField: "id_rol",
                        as: "Rol"
                    }
                }
            ]);
            res.json(resp);
        });
    }
    historial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.userController = new UserController();
