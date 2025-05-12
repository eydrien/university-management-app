import express, { Request, Response } from 'express';
import { getStats } from '../controllers/estadisticasController'; // importar el controlador

const statsRouter = express.Router();

statsRouter.get('/estadisticas', async (req: Request, res: Response) => {
  try {
    const stats = await getStats(); // Llamar al controlador para obtener las estadísticas
    res.status(200).json(stats); // Responder con las estadísticas en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
});

export { statsRouter };
