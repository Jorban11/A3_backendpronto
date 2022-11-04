//localhost:1000/usuarios
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

app.get("/usuarios", async (req,res)=>{
    let client = jfuncs.getClientDb()
    client.connect()
    //

    const { rows } = await client.query("SELECT * FROM table_users")
    //

    await client.end()
    res.send(rows)    
})


app.post("/usuarios", async (req,res)=>{
    let client = jfuncs.getClientDb()
    client.connect()
    //

    const sql = "INSERT INTO table_users (email,nome,id) VALUES ($1,$2,$3)"   
    const { 
        nome,
        email 
    } = req.body
    //

    const { 
        rows 
    } = await client.query(`SELECT * FROM table_users WHERE email = ${mysql.escape(req.body.email)}`)

    if (rows.length > 0){
        res.status(409).send({msg:`O email ${req.body.email} já está sendo utilizado!`})
    }else{
        const result = await client.query(sql, [email,nome,uuidv4()])
        console.log(result)
    }    
    //
      
    await client.end()
    res.end()
})


app.post("/eventos", (req,res)=>{
    console.log(req.body)
    res.status(201).send({msg : "WORKING"})
})

//---------------------------------------------------------------------

app.listen(1000, (req,res)=>{ 
    try{
        console.log("Usuarios PORTA 1000")
    } 
    catch(err){
        console.log("Usuarios ---ERRO---")
    }
})