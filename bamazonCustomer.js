const mysql = require("mysql");
const inquirer = require("inquirer");
// var fs = require("fs");
var Table = require('cli-table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Forever8861",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;

    displayItems();
});

function displayItems() {
    connection.query('select * from products', function (err, res) {
        if (err) throw (err);

        var table = new Table({
            head: ['Id', 'Product Name', 'Department Name', 'Price', 'QTY'],
            colWidths: [6, 20, 20, 10, 8]
        });
        console.log("\n");
        console.log("               Welcome to Bamazon! Your online Bazaar of deals!");
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name
                    , res[i].department_name, res[i].price, res[i].stock_quantity]
            );

        }
        console.log(table.toString());
    })
}








//   function start() {
//     inquirer
//       .prompt({
//         name: "postOrBid",
//         type: "list",
//         message: "Would you like to [POST] an auction or [BID] on an auction?",
//         choices: ["POST", "BID", "EXIT"]
//       })
//       .then(function(answer) {
//         // based on their answer, either call the bid or the post functions
//         if (answer.postOrBid === "POST") {
//           postAuction();
//         }
//         else if(answer.postOrBid === "BID") {
//           bidAuction();
//         } else{
//           connection.end();
//         }
//       });
//   }

