import { Imparte } from '../models/imparteModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';

//create
export const create = (imparte: Imparte, callback: Function) => {
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    
    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario],  
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



export const update = (imparte: Imparte, callback: Function) => {
    const queryString = 'UPDATE imparte SET horario = ? WHERE id_p = ? AND cod_a = ?'; 
 
    db.query(
        queryString,
        [imparte.horario, imparte.id_p, imparte.cod_a],
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
