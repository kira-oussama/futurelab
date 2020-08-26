const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "futurelab",
    port: 3308
});


conn.connect((err)=>{
    if (err) throw err;
})


const getConnection = ()=>{
    return conn;
}


module.exports = {getConnection};