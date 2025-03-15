import { Imparte } from '../models/imparteModel';
import { db } from '../../utils/db';
import { OkPacket, RowDataPacket } from 'mysql2';

//create
export const create = (imparte: Imparte, callback: Function) => {
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, semestre, horario) VALUES (?, ?, ?, ?, ?)';
    
    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.semestre, imparte.horario],  
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 201,
                message: 'Materia Asignada exitosamente',
                data: {
                    cod_a: imparte.cod_a
                }
            });
        }
    );
};



//read
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM imparte';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const impartir: Imparte[] = [];
        rows.forEach(row => {
            const imparte: Imparte = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                semestre: row.semestre,
                horario: row.horario
            };
            impartir.push(imparte);
        });
        callback(null, {
            statusCode: 200,
            message: 'Listado obtenido exitosamente',
            data: impartir
        });
    });
};

//Get para imparte que trae todas sus asignatutas que (Imparte)
export const getByIdP = (id_p: number, callback: Function) => {
    const queryString = 'SELECT * FROM imparte WHERE id_p = ?';

    db.query(queryString, [id_p], (err, result) => {
        if (err) { callback(err); }
 
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const imparte: Imparte = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                semestre: row.semestre,
                horario: row.horario
            };
            callback(null, {
                statusCode: 200,
                message: 'Asignaturas del profesor obtenidas exitosamente',
                data: imparte
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Asignaturas no encontradas'
            });
        }
    });
}

////Get para traer todos los profesores que imparten esa asignatura
export const getByCodA = (cod_a: number, callback: Function) => {
    const queryString = 'SELECT * FROM imparte WHERE cod_a = ?';

    db.query(queryString, [cod_a], (err, result) => {
        if (err) { callback(err); }
 
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const imparte: Imparte = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                semestre: row.semestre,
                horario: row.horario
            };
            callback(null, {
                statusCode: 200,
                message: 'Profesores obtenidas exitosamente',
                data: imparte
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Profesores no encontradas'
            });
        }
    });
}

export const update = (imparte: Imparte, callback: Function) => {
    const queryString = 'UPDATE imparte SET id_p = ?, grupo = ?, horario = ? WHERE id_p = ? AND cod_a = ? AND grupo = ? AND semestre = ?'; 
 
    db.query(
        queryString,
        [ imparte.id_p, imparte.cod_a, imparte.grupo,],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 200,
                message: 'Imparte actualizado exitosamente',
                data: {
                    cod_a: imparte.cod_a
                }
            });
        }
    );
};


export const remove = (id_p: number, callback: Function) => {
    const queryString = 'DELETE FROM imparte WHERE id_p = ? AND cod_a = ?';
 
    db.query(queryString, [id_p], (err) => {
        if (err) { callback(err); }
 
        callback(null, {
            statusCode: 200,
            message: ' eliminado exitosamente'
        });
    });
};
