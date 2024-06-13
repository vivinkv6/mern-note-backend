const express=require('express')
require('dotenv').config()
const cors=require('cors')
const connectDB=require('./config/db')

//routes
const userRoutes=require('./routes/userRoutes')
const noteRoutes=require('./routes/noteRoutes')

connectDB()

const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/users',userRoutes)
app.use('/api/notes',noteRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server Running on PORT:${process.env.PORT}`);
})
