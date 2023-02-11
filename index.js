
const express = require('express')
const app = express()

app.post('/',(req,res) =>{
    res.json("Hello Vika")
})

app.listen(3000)