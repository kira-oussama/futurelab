const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "FutureLab",
    port: 3308
});


conn.connect((err)=>{
    if (err) throw err;

    console.log("connected! :) ");
})


const getConnection = ()=>{
    return conn;
}


module.exports = {getConnection};