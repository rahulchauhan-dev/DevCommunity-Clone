import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'


dotenv.config()

connectDB()

const app = express()

app.use(express.json())




const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    app.get('*',(req,res) => 
    
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}else{
    app.get('/', (req, res) => {
        res.send('API is running..')
    })
}

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)


app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))