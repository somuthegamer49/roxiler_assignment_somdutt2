const Routes = require('./routes')
const express=require('express')
const app=express()
const cors = require('cors');

app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST','PATCH','DELETE']
}))
app.use(Routes)

app.use((err,req,res,next)=>{
    console.log(err)
    res.send('Sent from  error handler')
})

module.exports = app