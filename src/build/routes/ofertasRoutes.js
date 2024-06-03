"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ofertasController_1 = require("../controllers/ofertasController");
class OfertasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/create', ofertasController_1.ofertasController.create);
        this.router.get('/showAll/', ofertasController_1.ofertasController.list);
        this.router.get('/listOne/:id', ofertasController_1.ofertasController.listOne);
        this.router.delete('/delete/:id', ofertasController_1.ofertasController.delete);
        this.router.put('/update/:id', ofertasController_1.ofertasController.update);
        this.router.get('/ofertasActivas/', ofertasController_1.ofertasController.ofertasActivas);
        this.router.get('/numOfertasActivas/', ofertasController_1.ofertasController.numOfertasActivas);
        this.router.get('/duracionOfertas/', ofertasController_1.ofertasController.duracionOfertas);
        this.router.get('/ordenarFechaInicio/', ofertasController_1.ofertasController.ordenarFechaInicio);
        // this.router.get('/listAll_Ofertas_Producto/', ofertasController.listAll_Ofertas_Producto);
    }
}
const ofertasRoutes = new OfertasRoutes();
exports.default = ofertasRoutes.router;
