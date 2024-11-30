import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparteControllers';
import { Imparte } from '../models/imparteModel';

const imparteRouter = express.Router();


imparteRouter.post('/', async (req: Request, res: Response) => {
    const newImparte: Imparte = req.body;
    imparteController.create(newImparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});



imparteRouter.get('/', async (req: Request, res: Response) => {
    imparteController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});

imparteRouter.put('/:cod_a', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
   
    const updatedImparte: Imparte = { ...req.body, cod_a};
 
    imparteController.update(updatedImparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});


imparteRouter.delete('/:id_p/cod_a', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
 
    imparteController.remove(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

export {imparteRouter};