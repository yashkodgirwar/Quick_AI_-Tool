import express from 'express';
import cors from 'cors';
import 'dotenv/config'

const app =express();

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Server is alive')
})

const port=process.env.port || 3000

app.listen(port,()=>{
    console.log(`
        Server is Runing on ${port}`)
})