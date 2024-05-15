"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ProductoOfertaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // this.router.get('/list', productoOfertaController.list);
        // this.router.get('/listOneByIdProductoOferta', productoOfertaController.listOneByIdProductoOferta);
        // this.router.get('/listIdProducto', productoOfertaController.listIdProducto);
        // this.router.get('/listPorOferta/:id_oferta', productoOfertaController.listPorOferta);
        // this.router.get('/idproductosdeOfertasActivas/', productoOfertaController.idproductosdeOfertasActivas);
        // this.router.get('/listPorProducto/:id_producto', productoOfertaController.listPorProducto);
        // this.router.post('/create', productoOfertaController.create);
        // this.router.put('/update/:id_producto/:id_oferta', productoOfertaController.update);
        // this.router.delete('/delete', productoOfertaController.delete);
        // this.router.put('/anularOferta',productoOfertaController.anularOferta);
    }
}
const productoOfertaRoutes = new ProductoOfertaRoutes();
exports.default = productoOfertaRoutes.router;
