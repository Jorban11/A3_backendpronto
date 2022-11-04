// Se for alterar o banco de dados, dropar table_users 

// CREATE TABLE IF NOT EXISTS table_users( 
//     email VARCHAR(200) PRIMARY KEY,
//    nome VARCHAR(200) NOT NULL,
//    senha VARBINARY(100) NOT NULL,
//    id VARCHAR(100) NOT NULL
//   )

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
    // checkItemInDb : async (tabela, item) => {//depende do jfuncs.getClientDb() ! 
    //     const { 
    //         rows 
    //     } = await client.query(`SELECT * FROM ${tabela} WHERE ${item} = ${mysql.escape(req.body.item)}`)
    //     //

    //     return rows>0 ? True : False 
    // },
}

//---------------------------------------------------------------------

app.get("/usuarios", async (req,res)=>{
    let client = jfuncs.getClientDb()
    client.connect()
    //
    //                                  "SELECT * EXCEPT (senhas) FROM table_users"
    const { rows } = await client.query("SELECT * FROM table_users")
    //                                                  <tabela>

    await client.end()
    res.send(rows)
    //
})


app.post("/usuarios", async (req,res)=>{
    let client = jfuncs.getClientDb()
    client.connect()
    //                         <tabela>        <variaveis>
              //"INSERT INTO table_users (email, nome, senha, id) VALUES ($1,$2,$3,$4)"
    const sql = "INSERT INTO table_users (email,nome,id) VALUES ($1,$2,$3)"   
    const { 
        rows             
    } = await client.query(`SELECT * FROM table_users WHERE email = ${mysql.escape(req.body.email)}`)

    const { 
        nome,
        email,
        //senha, 
    } = req.body
    //    
    
    if (rows.length > 0){                               
        res.status(409).send({Sistema:`O email ${req.body.email} já está sendo utilizado!`})
    }else{
        const result = await client.query(sql, [email,nome,uuidv4()])
        console.log(result)                  //[email,nome,senha,uuidv4()]
        res.status(201).send({Sistema:"Usuario criado com sucesso!"})
    }    
    //
      
    await client.end()
    res.end()
    //
})


app.post("/eventos", (req,res)=>{
    console.log(req.body)
    res.status(201).send({Sistema : "WORKING"})
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