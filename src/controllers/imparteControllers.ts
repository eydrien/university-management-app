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
    const queryString = `
        SELECT imparte.*, profesores.nom_p AS nombre_profesor, asignaturas.nom_a AS nombre_asignatura
        FROM imparte 
        JOIN profesores ON imparte.id_p = profesores.id_p
        JOIN asignaturas ON imparte.cod_a = asignaturas.cod_a
    `;

    db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }

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

        // Agregamos el nombre del profesor solo en la respuesta del endpoint
        const responseData = impartir.map((item, index) => ({
            ...item,
            nombre_profesor: rows[index].nombre_profesor,
            nombre_asignatura: rows[index].nombre_asignatura
        }));

        callback(null, {
            statusCode: 200,
            message: 'Listado obtenido exitosamente',
            data: responseData
        });
    });
};


//Get para imparte que trae todas las asignaturas del profesor
export const getByIdP = (id_p: number, callback: Function) => {
    const queryString = `
    SELECT imparte.*, profesores.nom_p AS nombre_profesor, asignaturas.nom_a AS nombre_asignatura
    FROM imparte 
    JOIN profesores ON imparte.id_p = profesores.id_p
    JOIN asignaturas ON imparte.cod_a =asignaturas.cod_a
    WHERE  imparte.id_p = ? 
`;


    db.query(queryString, [id_p], (err, result) => {
        if (err) { callback(err); }

        const rows = <RowDataPacket>result;
        if (rows) {
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
            // Agregamos el nombre del profesor solo en la respuesta del endpoint
            const responseData = impartir.map((item, index) => ({
                ...item,
                nombre_profesor: rows[index].nombre_profesor,
                nombre_asignatura: rows[index].nombre_asignatura
            }));
            callback(null, {
                statusCode: 200,
                message: 'Asignaturas del profesor obtenidas exitosamente',
                data: responseData
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Asignaturas no encontradas'
            });
        }
    });
}

////Get para traer todos los profesores que imparten x asignatura
export const getByCodA = (cod_a: number, callback: Function) => {
    const queryString = `
    SELECT imparte.*, profesores.nom_p AS nombre_profesor, asignaturas.nom_a AS nombre_asignatura
    FROM imparte 
    JOIN profesores ON imparte.id_p = profesores.id_p
    JOIN asignaturas ON imparte.cod_a = asignaturas.cod_a
    WHERE  imparte.cod_a = ? 
`;
    db.query(queryString, [cod_a], (err, result) => {
        if (err) { callback(err); }

        const rows = <RowDataPacket[]>result;
        if (rows) {
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
            const responseData = impartir.map((item, index) => ({
                ...item,
                nombre_profesor: rows[index].nombre_profesor,
                nombre_asignatura: rows[index].nombre_asignatura
            }));
            callback(null, {
                statusCode: 200,
                message: 'profesores obtenidas exitosamente',
                data: responseData
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Profesores no encontradas'
            });
        }
    });
}

export const update = (
    primaryKey: { id_p: number; cod_a: number; grupo: number; semestre: number },
    updatedData: Partial<{ id_p: number; grupo: number; horario: string }>,
    callback: Function
) => {
    // Verificar si la clave compuesta existe antes de actualizar
    const checkQuery = `
        SELECT COUNT(*) AS count FROM imparte 
        WHERE id_p = ? AND cod_a = ? AND grupo = ? AND semestre = ?
    `;

    db.query(checkQuery, [primaryKey.id_p, primaryKey.cod_a, primaryKey.grupo, primaryKey.semestre], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (Array.isArray(result) && result.length > 0 && (result as any[])[0].count === 0) {
            // return callback(new Error('No existe registro en imparte'));
            return callback(null, {
                statusCode: 400,
                message: 'No existe registro en imparte',

            });
        }


        // Construir dinámicamente la parte SET de la consulta SQL
        const updateFields: string[] = [];
        const updateValues: any[] = [];

        if (updatedData.id_p !== undefined) {
            updateFields.push('id_p = ?');
            updateValues.push(updatedData.id_p);
        }
        if (updatedData.grupo !== undefined) {
            updateFields.push('grupo = ?');
            updateValues.push(updatedData.grupo);
        }
        if (updatedData.horario !== undefined) {
            updateFields.push('horario = ?');
            updateValues.push(updatedData.horario);
        }

        if (updateFields.length === 0) {
            //return callback(new Error('No se especificaron campos válidos para actualizar'));
            return callback(null, {
                statusCode: 400,
                message: 'No se especificaron campos válidos para actualizar',

            });
        }

        // Construir la consulta UPDATE
        const queryString = `
            UPDATE imparte 
            SET ${updateFields.join(', ')} 
            WHERE id_p = ? AND cod_a = ? AND grupo = ? AND semestre = ?
        `;

        // Agregar los valores de la clave primaria a la lista de parámetros
        updateValues.push(primaryKey.id_p, primaryKey.cod_a, primaryKey.grupo, primaryKey.semestre);

        db.query(queryString, updateValues, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, {
                statusCode: 200,
                message: 'Imparte actualizado exitosamente',
                data: updatedData
            });
        });
    });
};

export const remove = (
    primaryKey: { id_p: number; cod_a: number; grupo: number; semestre: number },
    callback: Function
) => {
    // Consulta para verificar si el registro existe antes de eliminarlo
    const checkQuery = `
        SELECT COUNT(*) AS count FROM imparte 
        WHERE id_p = ? AND cod_a = ? AND grupo = ? AND semestre = ?
    `;

    db.query(checkQuery, [primaryKey.id_p, primaryKey.cod_a, primaryKey.grupo, primaryKey.semestre], (err, result) => {
        if (err) {
            return callback(err);
        }

        // Verificar si el registro existe
        if (Array.isArray(result) && result.length > 0 && (result as any[])[0].count === 0) {
            //return callback(new Error('No existe registro en imparte'));
            return callback(null, {
                statusCode: 400,
                message: 'No existe registro en imparte',

            });
        }

        // Si existe, proceder con la eliminación
        const deleteQuery = `
            DELETE FROM imparte 
            WHERE id_p = ? AND cod_a = ? AND grupo = ? AND semestre = ?
        `;

        db.query(deleteQuery, [primaryKey.id_p, primaryKey.cod_a, primaryKey.grupo, primaryKey.semestre], (err) => {
            if (err) {
                return callback(err);
            }

            callback(null, {
                statusCode: 200,
                message: 'Registro eliminado exitosamente'
            });
        });
    });
};