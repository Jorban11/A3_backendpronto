const express = require("express")
const axios   = require("axios")

const app = express()

app.use(express.json())

const eventos = []

app.get("/eventos",(req,res)=>{
    res.send(eventos)
})

app.post("/eventos",(req,res)=>{
    const evento = req.body
    
    eventos.push(evento)

    axios.post("http://usu-clusterip:1000/eventos",evento).catch((err)=>{console.log("USU fora do ar!")})
    axios.post("http://med-clusterip:2000/eventos",evento).catch((err)=>{console.log("MED fora do ar!")})

    res.status(200).send({msg:"ok"})
})

app.listen(10000,(req,res)=>{
    try{
        console.log("Barramento de Eventos PORTA 10.000")
    }catch(err){
        console.log("Barramento de Eventos  ---ERROR---")
    }
})