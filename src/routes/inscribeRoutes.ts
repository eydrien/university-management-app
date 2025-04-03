import express, { Request, Response, NextFunction } from 'express';
import * as inscribeController from '../controllers/inscribeController';
import { Inscribe } from '../models/inscribeModel';

//creacion de inscribe
const inscribeRouter = express.Router();
inscribeRouter.post('/', async (req: Request, res: Response) => {
    const newInscribe: Inscribe = req.body;
    inscribeController.create(newInscribe, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

//get para busqueda general
inscribeRouter.get('/', async (req: Request, res: Response) => {
    inscribeController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

//traer asignaturas por codigo de estudiante
inscribeRouter.get('/estudiante/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    inscribeController.getById(cod_e, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

//traer informacion por estudiante, asignatura y grupo
inscribeRouter.get('/estudiante', async (req: Request, res: Response): Promise<void> => {
    const { cod_e, cod_a, grupo } = req.query;

    // Validar que los parámetros existen
    if (!cod_e || !cod_a || !grupo) {
        res.status(400).json({ message: 'Se requieren los parámetros query: cod_e, cod_a y grupo.' });
    }

    // Convertir los valores a número
    const codE = Number(cod_e);
    const codA = Number(cod_a);
    const grupoNum = Number(grupo);

    // Llamar al controlador
    inscribeController.getOneAsignatura(codE, codA, grupoNum, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

//trae asignatura por estudiante y semestre
inscribeRouter.get('/asignaturas', async (req: Request, res: Response): Promise<void> => {
    const { cod_e, semestre} = req.query;

    // Validar que los parámetros existen
    if (!cod_e || !semestre) {
        res.status(400).json({ message: 'Se requieren los parámetros query: cod_e y semestre.' });
    }

    // Convertir los valores a número
    const codE = Number(cod_e);
    const semestreNum = Number(semestre);

    // Llamar al controlador
    inscribeController.getBySemestre(codE, semestreNum, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

//Traer estudiante por asignatura y grupo
inscribeRouter.get('/estudiantes', async (req: Request, res: Response): Promise<void> => {
    const { cod_a, grupo} = req.query;

    // Validar que los parámetros existen
    if (!cod_a || !grupo) {
        res.status(400).json({ message: 'Se requieren los parámetros query: cod_a y grupo.' });
    }

    // Convertir los valores a número
    const codA = Number(cod_a);
    const grupoNum = Number(grupo);

    // Llamar al controlador
    inscribeController.getByAsignatura(codA, grupoNum, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

//Traer estudiante por asignatura, grupo y semestre
inscribeRouter.get('/estudiantes-semestre', async (req: Request, res: Response): Promise<void> => {
    const { cod_a, grupo, semestre} = req.query;

    // Validar que los parámetros existen
    if (!cod_a || !grupo || !semestre) {
        res.status(400).json({ message: 'Se requieren los parámetros query: cod_a, grupo y semestre.' });
    }

    // Convertir los valores a número
    const codA = Number(cod_a);
    const grupoNum = Number(grupo);
    const semestreNum = Number(semestre);

    // Llamar al controlador
    inscribeController.getByAsignaturaSemestre(codA, grupoNum, semestreNum, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

//actualizar
inscribeRouter.put('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Extraer los parámetros query que constituyen la clave primaria
    const { cod_e, cod_a, id_p, grupo, semestre } = req.query;

    // Validar que se hayan enviado todos los parámetros necesarios
    if (!cod_e || !cod_a || !id_p || !grupo || !semestre) {
        res.status(400).json({ message: 'Se requieren los parámetros query: cod_e, cod_a, id_p, grupo y semestre.' });
    }

    // Convertir los parámetros a los tipos correctos (grupo es number)
    const primaryKey = {
        cod_e: Number(cod_e),
        cod_a: Number(cod_a),
        id_p: Number(id_p),
        grupo: Number(grupo),
        semestre: Number(semestre)
    };

    // Utilizar el spread operator para capturar los campos a actualizar (deben ser algunos de: n1, n2, n3)
    const updatedData = { ...req.body };

    // Validar que se haya enviado al menos un campo para actualizar
    if (Object.keys(updatedData).length === 0) {
        res.status(400).json({ message: 'Debe enviar al menos un campo a actualizar (n1, n2, o n2).' });
    }

    inscribeController.update(primaryKey, updatedData, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

inscribeRouter.delete('/', async (req: Request, res: Response): Promise<void> => {
    // Extraer los parámetros de la query
    const { cod_e, cod_a, id_p, grupo, semestre } = req.query;

    // Validar que todos los parámetros están presentes
    if (!cod_e || !cod_a || !id_p || !grupo || !semestre) {
        res.status(400).json({ message: 'Se requieren los parámetros query: cod_e, cod_a, id_p, grupo y semestre.' });
    }

    // Convertir los valores a número
    const primaryKey = {
        cod_e: Number(cod_e),
        cod_a: Number(cod_a),
        id_p: Number(id_p),
        grupo: Number(grupo),
        semestre: Number(semestre)
    };

    inscribeController.remove(primaryKey, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});




export { inscribeRouter };