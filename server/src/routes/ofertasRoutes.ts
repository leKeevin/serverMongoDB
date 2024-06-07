import { Router } from 'express';
import { ofertasController } from '../controllers/ofertasController';
class OfertasRoutes
{
public router: Router=Router();
    constructor()
    {
    this.config();
    }
    config() : void{

        this.router.post('/create', ofertasController.create);
        this.router.get('/showAll/', ofertasController.list);
        this.router.get('/listOne/:id', ofertasController.listOne);
        this.router.delete('/delete/:id', ofertasController.delete);
        this.router.put('/update/:id', ofertasController.update);
        this.router.get('/ofertasActivas/', ofertasController.ofertasActivas);
        this.router.get('/numOfertasActivas/', ofertasController.numOfertasActivas);
        this.router.get('/duracionOfertas/', ofertasController.duracionOfertas);
        this.router.get('/ordenarFechaInicio/', ofertasController.ordenarFechaInicio);
        // this.router.get('/listAll_Ofertas_Producto/', ofertasController.listAll_Ofertas_Producto);

    }
}
const ofertasRoutes= new OfertasRoutes();
export default ofertasRoutes.router;