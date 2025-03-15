import { Estudiantes } from '../models/estudiantesModel';
import { db } from '../../utils/db';
import { OkPacket, RowDataPacket } from 'mysql2';

//create
export const create = (estudiante: Estudiantes, callback: Function) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac],
        (err) => {
            if (err) { callback(err); }

            //const insertId = (<OkPacket>result).insertId;
            //callback(null, insertId); // Devuelve el ID del estudiante creado

            callback(null, {
                statusCode: 201,
                message: 'Estudiante creado exitosamente',
                data: {
                    cod_e: estudiante.cod_e
                }
            });
        }
    );
};

//read
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM estudiantes';

    db.query(queryString, (err, result) => {
        if (err) { callback(err); }

        const rows = <RowDataPacket[]>result;
        const estudiantes: Estudiantes[] = [];
        rows.forEach(row => {
            const estudiante: Estudiantes = {
                cod_e: row.cod_e,
                nom_e: row.nom_e,
                dir_e: row.dir_e,
                tel_e: row.tel_e,
                fech_nac: row.fech_nac
            };
            estudiantes.push(estudiante);
        });
        callback(null, {
            statusCode: 200,
            message: 'Estudiantes obtenidos exitosamente',
            data: estudiantes
        });
    });
};

export const getOne = (cod_e: number, callback: Function) => {
    const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';

    db.query(queryString, [cod_e], (err, result) => {
        if (err) { callback(err); }
 
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const estudiante: Estudiantes = {
                cod_e: row.cod_e,
                nom_e: row.nom_e,
                dir_e: row.dir_e,
                tel_e: row.tel_e,
                fech_nac: row.fech_nac
            };
            callback(null, {
                statusCode: 200,
                message: 'Estudiante obtenido exitosamente',
                data: estudiante
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Estudiante no encontrado'
            });
        }
    });
}

//update
export const update = (estudiante: Estudiantes, callback: Function) => {
    const queryString = 'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';

    db.query(
        queryString,
        [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, estudiante.cod_e],
        (err) => {
            if (err) { callback(err); }

            callback(null, {
                statusCode: 200,
                message: 'Estudiante actualizado exitosamente',
                data: {
                    cod_e: estudiante.cod_e
                }
            });
        }
    );
};

//Remove
export const remove = (cod_e: number, callback: Function) => {
    const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';

    db.query(queryString, [cod_e], (err) => {
        if (err) { callback(err); }

        callback(null, {
            statusCode: 200,
            message: 'Estudiante eliminado exitosamente'
        });
    });
};