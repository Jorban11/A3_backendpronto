//localhost:2000/medicamentos
require("dotenv").config();

const {
    USER_DB,
    HOST_DB,
    DATABASE_DB,
    PASSWORD_DB,
    PORT_DB
} = process.env;

const { Client }   = require('pg');
const {v4: uuidv4} = require("uuid");
const axios        = require("axios");
const mysql        = require("mysql2");
const express      = require("express");

const app = express();

app.use(express.json());

//---------------------------------------------------------------------

const jfuncs = {
    getClientDb : () => {
        return new Client({
            user:     USER_DB,
            host:     HOST_DB,
            database: DATABASE_DB,
            password: PASSWORD_DB,
            port:     PORT_DB
          })
    },
    //------------------------------------------------------------------
    checkId : async (tabela, item) => {//depende do jfuncs.getClientDb() ! 
        const { 
            rows 
        } = await client.query(`SELECT * FROM ${tabela} WHERE ${item} = ${mysql.escape(req.body.item)}`)
        //

        client.end()
        return rows>0 ? True : False 
    },
    //------------------------------------------------------------------
    consultDb : async (tabela) => { //depende do jfuncs.getClientDb() !
        const {
            rows
        } = await client.query(`SELECT * FROM ${tabela}`)
        //

        client.end()
        return rows
    }
}

//---------------------------------------------------------------------

app.get("/medicamentos", async (req,res)=>{
    let client = getClientDb()
    client.connect()
    //

    const { rows } = await client
        .query("SELECT * FROM table_med")
    //
    await client.end()
    res.send(rows)

})

app.post("/medicamentos", async (req,res)=>{
    let client = getClientDb()
    client.connect()
    //

    const {
        nome,
        nivel,
        empresa,
        estoque
    } = req.body
    const sql = "INSERT INTO table_med (id,nome,nivel,empresa,estoque) VALUES ($1,$2,$3,$4,$5)"
    //

    const result = await client
        .query(sql, [uuidv4(),nome,nivel,empresa,estoque])
    console.log(result)
    //

    await client.end()
    res.end()
})

app.post("/eventos", (req,res)=>{
    console.log(req.body)
    //

    res.status(201).send({  msg : "WORKING"  
})

})

//---------------------------------------------------------------------

app.listen(2000, (req,res)=>{ 
    try{console.log("Medicamentos PORTA 2000")} 
    catch(err){
        console.log("Medicamentos ---ERRO---")}
}) 