import express, { Request, Response,NextFunction } from 'express';
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

imparteRouter.get('/profesores/:id_p/asignaturas', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    imparteController.getByIdP(id_p,(err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});

imparteRouter.get('/asignaturas/:cod_a/profesores', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
    imparteController.getByCodA(cod_a,(err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});

imparteRouter.put('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Extraer los parámetros query que constituyen la clave primaria
    const { id_p, cod_a, grupo, semestre } = req.query;
 
    // Validar que se hayan enviado todos los parámetros necesarios
    if (!id_p || !cod_a || !grupo || !semestre) {
        res.status(400).json({ message: 'Se requieren los parámetros query: id_p, cod_a, grupo y semestre.' });
    }
 
    // Convertir los parámetros a los tipos correctos (grupo es number)
    const primaryKey = {
        id_p: Number(id_p),
        cod_a: Number(cod_a),
        grupo: Number(grupo),
        semestre: Number(semestre)
    };
 
    // Utilizar el spread operator para capturar los campos a actualizar (deben ser algunos de: id_p, grupo, horario)
    const updatedData = { ...req.body };
 
    // Validar que se haya enviado al menos un campo para actualizar
    if (Object.keys(updatedData).length === 0) {
        res.status(400).json({ message: 'Debe enviar al menos un campo a actualizar (id_p, grupo, o horario).' });
    }
 
    imparteController.update(primaryKey, updatedData, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

imparteRouter.delete('/', async (req: Request, res: Response): Promise<void> => {
    // Extraer los parámetros de la query
    const { id_p, cod_a, grupo, semestre } = req.query;

    // Validar que todos los parámetros están presentes
    if (!id_p || !cod_a || !grupo || !semestre) {
       res.status(400).json({ message: 'Se requieren los parámetros query: id_p, cod_a, grupo y semestre.' });
    }

    // Convertir los valores a número
    const primaryKey = {
        id_p: Number(id_p),
        cod_a: Number(cod_a),
        grupo: Number(grupo),
        semestre: Number(semestre)
    };

    imparteController.remove(primaryKey, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});


export {imparteRouter};