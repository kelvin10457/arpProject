
//dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//routes
import landsRouter from './routes/landsRoutes.mjs';
import harvestRouter from './routes/harvestRoutes.mjs';
import clasificationRouter from './routes/clasificationRoutes.mjs';
import salesRouter from './routes/salesRoutes.mjs';

dotenv.config();

const app = express();

//middlewares
// CORS: permitir orígenes dinámicamente y manejar preflight
const corsOptions = {
    origin: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(landsRouter);
app.use(harvestRouter);
app.use(clasificationRouter);
app.use(salesRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`the port is running on ${PORT}`);
});

