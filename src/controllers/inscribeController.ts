import { Inscribe } from '../models/inscribeModel';
import { db } from '../../utils/db';
import { OkPacket, RowDataPacket } from 'mysql2';


export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM inscribe';
    db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = <RowDataPacket[]>result;
        const inscripciones: Inscribe[] = [];
        rows.forEach(row => {
            const inscribe: Inscribe = {
                cod_e: row.cod_e,
                cod_a: row.cod_a,
                id_p: row.id_p,
                grupo: row.grupo,
                semestre: row.semestre,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3
            };
            inscripciones.push(inscribe);
        });
        callback(null, {
            statusCode: 200,
            message: 'Inscripciones obtenidas exitosamente',
            data: result
        });
    });
}

export const getById = (cod_e: number, callback: Function) => {
    const queryString = 'SELECT * FROM inscribe WHERE cod_e = ?';
    db.query(queryString, [cod_e], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const inscribe: Inscribe = {
                cod_e: row.cod_e,
                cod_a: row.cod_a,
                id_p: row.id_p,
                grupo: row.grupo,
                semestre: row.semestre,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3
            };
            callback(null, {
                statusCode: 200,
                message: 'Inscripcion obtenida exitosamente',
                data: inscribe
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Inscripcion no encontrada'
            });
        }
    });
}