import express, { Application } from 'express';
import biperRouter from './routes/BeeperR.js';
import dotenv from  'dotenv';


dotenv.config();
const PORT: number | string = process.env.PORT || '3011';

const app: Application = express();


app.use(express.json());
app.use('/',biperRouter);


app.listen(PORT, ()=> {console.log(`server listen to port:  ${PORT}`);
});
