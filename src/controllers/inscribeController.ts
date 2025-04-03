import { Inscribe } from '../models/inscribeModel';
import { db } from '../../utils/db';
import { OkPacket, RowDataPacket } from 'mysql2';

//create
export const create = (inscribeRouter: Inscribe, callback: Function) => {
    const queryString = 'INSERT INTO inscribe (cod_e, cod_a, id_p, grupo, semestre, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [inscribeRouter.cod_e, inscribeRouter.cod_a, inscribeRouter.id_p, inscribeRouter.grupo, inscribeRouter.semestre, inscribeRouter.n1, inscribeRouter.n2, inscribeRouter.n3],
        (err) => {
            if (err) { callback(err); }

            callback(null, {
                statusCode: 201,
                message: 'Notas cargadas exitosamente',
                data: {
                    cod_a: inscribeRouter.cod_a
                }
            });
        }
    );
};

//obtener
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
    const queryString = `SELECT inscribe.*, estudiantes.nom_e AS nombre_estudiante, asignaturas.nom_a AS nombre_asignatura
    FROM inscribe
    JOIN estudiantes ON inscribe.cod_e = estudiantes.cod_e
    JOIN asignaturas ON inscribe.cod_a = asignaturas.cod_a
    WHERE inscribe.cod_e = ?;`
    db.query(queryString, [cod_e], (err, result) => {
        if (err) {
            callback(err);
        }

        const rows = <RowDataPacket[]>result;
        const inscripciones: Inscribe[] = [];

        if (rows) {
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
            const responseData = inscripciones.map((item, index) => ({
                ...item,
                nombre_estudiante: rows[index].nombre_estudiante,
                nombre_asignatura: rows[index].nombre_asignatura
            }));

            callback(null, {
                statusCode: 200,
                message: 'Inscribe obtenido exitosamente',
                data: responseData
            });

        } else {
            callback(null, {
                statusCode: 404,
                message: 'No se encontró inscribe con los parámetros proporcionados'
            });
        }
    });
}

export const getOneAsignatura = (cod_e: number, cod_a: number, grupo: number, callback: Function) => {
    const queryString = `SELECT inscribe.*,estudiantes.nom_e AS nombre_estudiante, asignaturas.nom_a AS nombre_asignatura
    FROM inscribe 
    JOIN estudiantes ON inscribe.cod_e = estudiantes.cod_e
    JOIN asignaturas ON inscribe.cod_a = asignaturas.cod_a
    WHERE inscribe.cod_e = ? AND inscribe.cod_a = ? AND inscribe.grupo = ?`;

    db.query(queryString, [cod_e, cod_a, grupo], (err, result) => {
        if (err) {
            return callback(err);
        }
        const rows = <RowDataPacket[]>result;
        const inscripciones: Inscribe[] = [];
        if (rows) {
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
            const responseData = inscripciones.map((item, index) => ({
                ...item,
                nombre_estudiante: rows[index].nombre_estudiante,
                nombre_asignatura: rows[index].nombre_asignatura
            }));
            callback(null, {
                statusCode: 200,
                message: 'Inscribe obtenido exitosamente',
                data: responseData
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'No se encontró inscribe con los parámetros proporcionados'
            });
        }
    });
};

export const getBySemestre = (cod_e: number, semestre: number, callback: Function) => {
    const queryString = `SELECT inscribe.*,estudiantes.nom_e AS nombre_estudiante, asignaturas.nom_a AS nombre_asignatura
    FROM inscribe 
    JOIN estudiantes ON inscribe.cod_e = estudiantes.cod_e
    JOIN asignaturas ON inscribe.cod_a = asignaturas.cod_a
    WHERE inscribe.cod_e = ? AND inscribe.semestre = ?`;

    db.query(queryString, [cod_e, semestre], (err, result) => {
        if (err) {
            return callback(err);
        }
        const rows = <RowDataPacket[]>result;
        const inscripciones: Inscribe[] = [];
        if (rows) {
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

            const responseData = inscripciones.map((item, index) => ({
                ...item,
                nombre_estudiante: rows[index].nombre_estudiante,
                nombre_asignatura: rows[index].nombre_asignatura
            }));

            callback(null, {
                statusCode: 200,
                message: 'Inscribe obtenido exitosamente',
                data: responseData
            });

        } else {
            callback(null, {
                statusCode: 404,
                message: 'No se encontró inscribe con los parámetros proporcionados'
            });
        }
    });
}

export const getByAsignatura = (cod_a: number, grupo: number, callback: Function) => {
    const queryString = `SELECT inscribe.*,estudiantes.nom_e AS nombre_estudiante, asignaturas.nom_a AS nombre_asignatura
    FROM inscribe 
    JOIN estudiantes ON inscribe.cod_e = estudiantes.cod_e
    JOIN asignaturas ON inscribe.cod_a = asignaturas.cod_a
    WHERE inscribe.cod_a = ? AND inscribe.grupo = ?`;

    db.query(queryString, [cod_a, grupo], (err, result) => {
        if (err) {
            return callback(err);
        }
        const rows = <RowDataPacket[]>result;
        const inscripciones: Inscribe[] = [];
        if (rows) {
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
            const responseData = inscripciones.map((item, index) => ({
                ...item,
                nombre_estudiante: rows[index].nombre_estudiante,
                nombre_asignatura: rows[index].nombre_asignatura
            }));

            callback(null, {
                statusCode: 200,
                message: 'Inscribe obtenido exitosamente',
                data: responseData
            });

        } else {
            callback(null, {
                statusCode: 404,
                message: 'inscribe no encontrados'
            });
        }
    });
}

export const getByAsignaturaSemestre = (cod_a: number, grupo: number, semestre: number, callback: Function) => {
    const queryString = `SELECT inscribe.*,estudiantes.nom_e AS nombre_estudiante, asignaturas.nom_a AS nombre_asignatura
    FROM inscribe 
    JOIN estudiantes ON inscribe.cod_e = estudiantes.cod_e
    JOIN asignaturas ON inscribe.cod_a = asignaturas.cod_a
    WHERE inscribe.cod_a = ? AND inscribe.grupo = ? AND inscribe.semestre = ?` ;

    db.query(queryString, [cod_a, grupo, semestre], (err, result) => {
        if (err) {
            return callback(err);
        }
        const rows = <RowDataPacket[]>result;
        const inscripciones: Inscribe[] = [];
        if (rows) {
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
            const responseData = inscripciones.map((item, index) => ({
                ...item,
                nombre_estudiante: rows[index].nombre_estudiante,
                nombre_asignatura: rows[index].nombre_asignatura
            }));

            callback(null, {
                statusCode: 200,
                message: 'Inscribe obtenido exitosamente',
                data: responseData
            });

        } else {
            callback(null, {
                statusCode: 404,
                message: 'inscribe no encontrados'
            });
        }
    });
}

//update
export const update = (
    primaryKey: { cod_e: number; cod_a: number; id_p: number; grupo: number; semestre: number },
    updatedData: Partial<{ n1: number; n2: number; n3: string }>,
    callback: Function
) => {
    // Verificar si la clave compuesta existe antes de actualizar
    const checkQuery = `
        SELECT COUNT(*) AS count FROM inscribe 
        WHERE cod_e = ? AND cod_a= ? AND id_p = ? AND grupo = ? AND semestre = ?
    `;

    db.query(checkQuery, [primaryKey.cod_e, primaryKey.cod_a, primaryKey.id_p, primaryKey.grupo, primaryKey.semestre], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (Array.isArray(result) && result.length > 0 && (result as any[])[0].count === 0) {

            return callback(null, {
                statusCode: 400,
                message: 'No existe registro en inscribe',

            });
        }


        // Construir dinámicamente la parte SET de la consulta SQL
        const updateFields: string[] = [];
        const updateValues: any[] = [];

        if (updatedData.n1 !== undefined) {
            updateFields.push('n1 = ?');
            updateValues.push(updatedData.n1);
        }
        if (updatedData.n2 !== undefined) {
            updateFields.push('n2 = ?');
            updateValues.push(updatedData.n2);
        }
        if (updatedData.n3 !== undefined) {
            updateFields.push('n3 = ?');
            updateValues.push(updatedData.n3);
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
            UPDATE inscribe 
            SET ${updateFields.join(', ')} 
            WHERE cod_e = ? AND cod_a= ? AND id_p = ? AND grupo = ? AND semestre = ?
        `;

        // Agregar los valores de la clave primaria a la lista de parámetros
        updateValues.push(primaryKey.cod_e, primaryKey.cod_a, primaryKey.id_p, primaryKey.grupo, primaryKey.semestre);

        db.query(queryString, updateValues, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, {
                statusCode: 200,
                message: 'Inscribe actualizado exitosamente',
                data: updatedData
            });
        });
    });
};
//remove
export const remove = (
    primaryKey: { cod_e: number; cod_a: number; id_p: number; grupo: number; semestre: number },
    callback: Function
) => {
    // Consulta para verificar si el registro existe antes de eliminarlo
    const checkQuery = `
        SELECT COUNT(*) AS count FROM inscribe 
        WHERE cod_e = ? AND cod_a= ? AND id_p = ? AND grupo = ? AND semestre = ?
    `;

    db.query(checkQuery, [primaryKey.cod_e, primaryKey.cod_a, primaryKey.id_p, primaryKey.grupo, primaryKey.semestre], (err, result) => {
        if (err) {
            return callback(err);
        }

        // Verificar si el registro existe
        if (Array.isArray(result) && result.length > 0 && (result as any[])[0].count === 0) {
            return callback(null, {
                statusCode: 400,
                message: 'No existe registro en inscribe',

            });
        }

        // Si existe, proceder con la eliminación
        const deleteQuery = `
            DELETE FROM inscribe 
            WHERE cod_e = ? AND cod_a= ? AND id_p = ? AND grupo = ? AND semestre = ?
        `;

        db.query(deleteQuery, [primaryKey.cod_e, primaryKey.cod_a, primaryKey.id_p, primaryKey.grupo, primaryKey.semestre], (err) => {
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