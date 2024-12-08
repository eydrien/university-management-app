import express, { Request, Response } from 'express';
import * as estudianteController from '../controllers/estudianteController';
import { Estudiante } from '../models/estudianteModel';
const estudianteRouter = express.Router();
 //CREACION DE UN ESTUDIANTE
estudianteRouter.post('/', async (req: Request, res: Response) => {
    const newEstudiante: Estudiante = req.body;
    estudianteController.create(newEstudiante, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 


//OBTNER DATOS 
estudianteRouter.get('/', async (req: Request, res: Response) => {
    estudianteController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});

estudianteRouter.get('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    estudianteController.getOnly(cod_e,(  err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});


//ACTUALIZAR
estudianteRouter.put('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
   
    const updatedEstudiante: Estudiante = { ...req.body, cod_e };
 
    estudianteController.update(updatedEstudiante, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 


//ELIMINAR
estudianteRouter.delete('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
 
    estudianteController.remove(cod_e, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

export {estudianteRouter};