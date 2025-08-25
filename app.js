require('dotenv').config()
require('express-async-errors')
const notFound=require('./middleware/not-found')
const errorHandle=require('./middleware/error-handler')
const productRouter=require('./routes/products')

//async error



const express=require('express')
const app=express()
const connectDB=require('./db/connect')


//middleware setup
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/tasks">Store api</a>')
})
app.use('/api/v1/products',productRouter)

app.use(notFound)
app.use(errorHandle)
//server setup

const port= process.env.PORT ||3000

const start= async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on port ${port}... `))
    } catch (error) {
        console.log(error)
    }
}

start()