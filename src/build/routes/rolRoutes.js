"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RolRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // this.router.get('/',(req,res) => res.send('probando roles'));
        // this.router.post('/create', rolController.create);
        // this.router.put('/update/:id',validarToken,rolController.update);
        // this.router.delete('/delete/:id',validarToken, rolController.delete);
        // this.router.get('/showAll/', rolController.list );
        // this.router.get('/listOne/:id',validarToken,rolController.listOne );
    }
}
const rolRoutes = new RolRoutes();
exports.default = rolRoutes.router;
