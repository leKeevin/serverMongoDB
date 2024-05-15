"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ProductoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // this.router.get('/',(req,res) => res.send('probando productos'));
        // this.router.post('/create', productoController.create);
        // this.router.put('/update/:id',productoController.update);
        // this.router.delete('/delete/:id', productoController.delete);
        // this.router.get('/showAll/', productoController.list );
        // this.router.get('/listOne/:id', productoController.listOne );
        // this.router.get('/listAnimal/:nombre',productoController.listAnimal);
        // this.router.post('/filtraPrecio/',productoController.filtraPrecio);        
        // this.router.get('/getCantidad/:id',productoController.getCantidad);
        // this.router.get('/getPrecio/:id',productoController.getPrecio);
        // this.router.get('/getAnimal/',productoController.getAnimal);
        // this.router.get('/getNombreProducto/',productoController.getNombresProducto);
        // this.router.put('/reducirCant/',productoController.reducirCant);
    }
}
const productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;
