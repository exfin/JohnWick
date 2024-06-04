import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import castigoModel from './model/castigoModel.js'
import userRouter from './route/userRouter.js'
import leaderRouter from './route/leaderRoute.js'
import {connectionDB} from './config/db.js'
import adminRouter from './route/adminRoute.js'
import authMiddleware from './middleware/auth.js'
import conflictRouter from './route/conflictRoute.js'

//se habilita el pruerto de nuestra app
const PORT = process.env.PORT || 8081
const app = express()
const corsOptions = {
    origin: process.env.CORS_ORIGIN, 
    methods: ["POST","GET"],
    credentials: true,
    optionsSuccessStatus: 200 
  };
app.use(cors(corsOptions))
app.use(express.json())

connectionDB().catch(error => console.error('Failed to connect to MongoDB:', error.message));
app.use('/api/user', userRouter);
app.use('/api/leader', leaderRouter);
app.use('/api/admin', adminRouter);
app.use('/api/conflict', conflictRouter);
app.get('/api/check-auth', authMiddleware, (req, res) => {
  res.json({ Status: "Success" });
});


app.listen(PORT,()=>{console.log(`Corriendo en el localHost:${PORT}`)})

