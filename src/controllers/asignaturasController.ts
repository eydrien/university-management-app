import { Asignaturas } from '../models/asignaturasModel';
import { db } from '../../utils/db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (asignatura: Asignaturas, callback: Function) => {
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos ) VALUES (?, ?, ?, ?)';
 
    db.query(
        queryString,
        [asignatura.cod_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos, ],
        (err) => {
            if (err) { callback(err); }
 
            //const insertId = (<OkPacket>result).insertId;
            //callback(null, insertId); // Devuelve el ID del asignatura creado
 
            callback(null, {
                statusCode: 201,
                message: 'Asignatura creada exitosamente',
                data: {
                    cod_a: asignatura.cod_a
                }
            });
        }
    );
};

//read
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM asignaturas';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const asignaturas: Asignaturas[] = [];
        rows.forEach(row => {
            const asignatura: Asignaturas = {
                cod_a: row.cod_a,
                nom_a: row.nom_a,
                int_h: row.int_h,
                creditos: row.creditos
            };
            asignaturas.push(asignatura);
        });
        callback(null, {
            statusCode: 200,
            message: 'Asignaturas obtenidas exitosamente',
            data: asignaturas
        });
    });
};


export const getOne = (cod_a: number, callback: Function) => {
    const queryString = 'SELECT * FROM asignaturas WHERE cod_a = ?';

    db.query(queryString, [cod_a], (err, result) => {
        if (err) { callback(err); }
 
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const asignatura: Asignaturas = {
                cod_a: row.cod_a,
                nom_a: row.nom_a,
                int_h: row.int_h,
                creditos: row.creditos
            };
            callback(null, {
                statusCode: 200,
                message: 'asignatura obtenido exitosamente',
                data: asignatura
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'asignatura no encontrado'
            });
        }
    });
}


//update
export const update = (asignatura: Asignaturas, callback: Function) => {
    const queryString = 'UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE cod_a = ?';
 
    db.query(
        queryString,
        [asignatura.nom_a, asignatura.int_h, asignatura.creditos, asignatura.cod_a],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 200,
                message: 'Asignaturas actualizada exitosamente',
                data: {
                    cod_a: asignatura.cod_a
                }
            });
        }
    );
};

//Remove
export const remove = (cod_a: number, callback: Function) => {
    const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';
 
    db.query(queryString, [cod_a], (err) => {
        if (err) { callback(err); }
 
        callback(null, {
            statusCode: 200,
            message: 'Asignaturas eliminado exitosamente'
        });
    });
};