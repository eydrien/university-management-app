import express, { Request, Response } from 'express';
import * as asignaturaController from '../controllers/asignaturasController';
import { Asignaturas } from '../models/asignaturasModel';
const asignaturaRouter = express.Router();

 //CREACION de una asignatura
asignaturaRouter.post('/', async (req: Request, res: Response) => {
    const newAsignatura: Asignaturas = req.body;
    asignaturaController.create(newAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 

//OBTENER DATOS 
asignaturaRouter.get('/', async (req: Request, res: Response) => {
    asignaturaController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});

asignaturaRouter.get('/:cod_a', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
   
 
    asignaturaController.getOne( cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});


//ACTUALIZAR
asignaturaRouter.put('/:cod_a', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
   
    const updatedAsignatura: Asignaturas = { ...req.body, cod_a };
 
    asignaturaController.update(updatedAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 


//ELIMINAR
asignaturaRouter.delete('/:cod_a', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
 
    asignaturaController.remove(cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

export {asignaturaRouter};