import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import userRouter from './routes/userRoutes.js';
import connectCloudanry from './configs/cloudinary.js';

const app =express();
await connectCloudanry()

app.use(cors());
app.use(express.json())
app.use(clerkMiddleware())


app.get('/',(req,res)=>{
    res.send('Server is alive')
})
const port=process.env.port || 3000
app.use('/api/ai',aiRouter)
app.use('api/user',userRouter)

app.listen(port,()=>{
    console.log(`
        Server is Runing on ${port}`)
})