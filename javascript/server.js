import express from 'express';
import biperRouter from './routes/BeeperR.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || '3011';
const app = express();
app.use(express.json());
app.use('/', biperRouter);
app.listen(PORT, () => {
    console.log(`server listen to port:  ${PORT}`);
});
