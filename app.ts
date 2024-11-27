import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { estudianteRouter } from './src/routes/estudianteRoutes';
import{ profesorRouter } from './src/routes/profesorRoutes';
import { asignaturaRouter } from './src/routes/asignaturasRoutes';
import { db } from './db';
import cors from 'cors';

const app = express();
dotenv.config();



app.use(cors());
app.use(bodyParser.json());

app.get('/', ( req, res) => {
    
    res.type('text/plain');
    res.status(200).send('Welcome!');
});

//rutas
app.use('/estudiante', estudianteRouter);
app.use('/profesor', profesorRouter);
app.use('/asignatura', asignaturaRouter);





db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database Connected');
    }
});

app.use((req: Request, res: Response) => {
    res.status(404).send({ error: 'Not Found', message: 'URL not found' });
});

app.listen(process.env.PORT, () => {
    console.log('Node server started running');
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);

});
