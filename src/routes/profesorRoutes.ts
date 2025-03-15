import express, { Request, Response } from 'express';
import * as profesorController from '../controllers/profesoresController';
import { Profesores } from '../models/profesoresModel';
const profesorRouter = express.Router();

 //CREACION DE UN PROFESOR
profesorRouter.post('/', async (req: Request, res: Response) => {
    const newProfesor: Profesores = req.body;
    profesorController.create(newProfesor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});



//OBTNER DATOS 
profesorRouter.get('/', async (req: Request, res: Response) => {
    profesorController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});
profesorRouter.get('/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
   

 
    profesorController.getOne( id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});


//ACTUALIZAR
profesorRouter.put('/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
   
    const updatedProfesor: Profesores = { ...req.body, id_p };
 
    profesorController.update(updatedProfesor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});



//ELIMINAR
profesorRouter.delete('/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
 
    profesorController.remove(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});


export {profesorRouter};