"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando usuarios'));
        this.router.post('/create', userController_1.userController.create);
        // this.router.put('/nuevaContra', userController.nuevaContra);
        // this.router.post('/validarUsuario/', userController.validarUsuario);
        // this.router.post('/validarCorreo/', userController.validarCorreo);
        // this.router.put('/update/:id',userController.update);
        this.router.delete('/delete/:id', userController_1.userController.delete);
        this.router.get('/showAll/', userController_1.userController.list);
        this.router.get('/listOne/:id', userController_1.userController.listOne);
        // this.router.get('/listUserRol/:id',userController.listUserRol);
        // this.router.get('/historial/:id',userController.historial);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
