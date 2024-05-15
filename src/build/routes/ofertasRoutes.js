"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class OfertasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // this.router.post('/create', ofertasController.create);
        // this.router.put('/update/:id',ofertasController.update);
        // this.router.delete('/delete/:id', ofertasController.delete);
        // this.router.get('/showAll/', ofertasController.list );
        // this.router.get('/listOne/:id', ofertasController.listOne );
        // this.router.get('/ofertasActivas/', ofertasController.ofetasActivas);
        // this.router.get('/numOfertasActivas/', ofertasController.numOfetasActivas);
        // this.router.get('/duracionOfertas/', ofertasController.duracionOfertas);
        // this.router.get('/ordenarFechaInicio/', ofertasController.ordenarFechaInicio);
        // this.router.get('/listAll_Ofertas_Producto/', ofertasController.listAll_Ofertas_Producto);
    }
}
const ofertasRoutes = new OfertasRoutes();
exports.default = ofertasRoutes.router;
