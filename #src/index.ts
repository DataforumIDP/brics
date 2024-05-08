import express, { Request, Response } from 'express'
import cors from 'cors'

import path from 'path';
global.uploadDir = path.join(__dirname, 'uploads_files');

import { filesRouter } from './routes/filesRouter';

const app = express()

app.use(cors())

app.use('/api/files', filesRouter)

app.use((req: Request, res: Response)=>{
    res.status(404).json({
        error: 'API`s not found'
    })
})

const PORT = 3225

app.listen(PORT, ()=>{
    console.log('Server started on port: '+ PORT);
})