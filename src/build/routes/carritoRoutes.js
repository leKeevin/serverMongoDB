"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class CarritoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // this.router.get('/',(req,res) => res.send('probando carritos'));
        // this.router.post('/create', carritoController.create);
        // this.router.put('/update/:id',carritoController.update);
        // this.router.delete('/delete/:id', carritoController.delete);
        // this.router.get('/showAll/', carritoController.list );
        // this.router.get('/listOne/:id', carritoController.listOne );
        // this.router.get('/listCarritoUsuario/:id',carritoController.listCarritoUsuario);
        // this.router.get('/totalCarrito/:id',carritoController.totalCarrito);                
        // this.router.get('/listCarritoProducto/:id',carritoController.listCarritoProducto);        
    }
}
const carritoRoutes = new CarritoRoutes();
exports.default = carritoRoutes.router;
