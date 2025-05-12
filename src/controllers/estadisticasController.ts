import { db } from '../../utils/db'; // Importar la conexión de la base de datos

// Definir un tipo específico para las respuestas de la consulta
interface TotalCount {
  total: number;
}

export const getStats = async () => {
  try {
    // Realizamos las consultas y almacenamos los resultados
    const [estudiantes]: any = await db.promise().query('SELECT COUNT(*) AS total FROM estudiantes');
    const [profesores]: any = await db.promise().query('SELECT COUNT(*) AS total FROM profesores');
    const [asignaturas]: any = await db.promise().query('SELECT COUNT(*) AS total FROM asignaturas');

    // Transformamos los resultados de la consulta a la estructura deseada
    return {
      estudiantes: estudiantes[0].total,
      profesores: profesores[0].total,
      asignaturas: asignaturas[0].total
    };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw new Error('Error al obtener estadísticas');
  }
};
