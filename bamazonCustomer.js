var mysql = require("mysql");
var inquirer = require("inquirer");






const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Forever8861",
    database: "bamazon_db"
});