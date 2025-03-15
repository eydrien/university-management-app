import express, { Request, Response } from 'express';
import * as estudianteController from '../controllers/estudiantesController';
import { Estudiantes } from '../models/estudiantesModel';
const estudianteRouter = express.Router();
 //CREACION DE UN ESTUDIANTE
estudianteRouter.post('/', async (req: Request, res: Response) => {
    const newEstudiante: Estudiantes = req.body;
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

    estudianteController.getOne(cod_e,(  err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});


//ACTUALIZAR
estudianteRouter.put('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
   
    const updatedEstudiante: Estudiantes = { ...req.body, cod_e };
 
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