"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolController_1 = require("../controllers/rolController");
class RolRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando roles'));
        this.router.post('/create', rolController_1.rolController.create);
        this.router.put('/update/:id', rolController_1.rolController.update);
        this.router.delete('/delete/:id', rolController_1.rolController.delete);
        this.router.get('/showAll/', rolController_1.rolController.list);
        this.router.get('/listOne/:id', rolController_1.rolController.listOne);
    }
}
const rolRoutes = new RolRoutes();
exports.default = rolRoutes.router;
