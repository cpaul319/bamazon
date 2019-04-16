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
    // displayItems();
});

function menu() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Pick an option below",
        choices: [
          "View products for sale",
          "View low inventory",
          "Add inventory",
          "Add new product",
          "exit"
        ]
      })
      .then(function(answer) {  
        switch (answer.action) {
        case "View products for sale":
        displayItems();
            break;
  
        case "View low inventory":
            lowInventory();
            break;
  
        case "Add inventory":
            addInventory();
            break;
  
        case "Add new product":
            addNewProduct();
            break;
            
        case "exit":
            connection.end();
            break;
        }
      });
  }
  function displayItems() {
    connection.query('select * from products', function (err, res) {
        if (err) throw (err);
        var tableItems = new Table({
            head: ['Id', 'Product Name', 'Department Name', 'Price', 'QTY'],
            colWidths: [6, 20, 20, 10, 8]
        });
        console.log("\n");
        console.log("            Welcome to Bamazon! Your online Bazaar of deals!");
        for (var i = 0; i < res.length; i++) {
            
            tableItems.push(
                [res[i].item_id, res[i].product_name
                    , res[i].department_name, res[i].price, res[i].stock_quantity]
            );

        }
        
        console.log(tableItems.toString());
        menu();
    })
}


function lowInventory() {
    connection.query('select * from products WHERE stock_quantity < 5', function (err, res) {
        if (err) throw (err);
        var tableItems = new Table({
            head: ['Id', 'Product Name', 'Department Name', 'Price', 'QTY'],
            colWidths: [6, 20, 20, 10, 8]
        });
        if (!res.length){
            console.log("All items are above 5 quantity.")
        }else
        console.log("\n");
        console.log("Here is a list of items for sale below the quantity of 5.");
        for (var i = 0; i < res.length; i++) {
            
            tableItems.push(
                [res[i].item_id, res[i].product_name
                    , res[i].department_name, res[i].price, res[i].stock_quantity]
            );

        }
        
        console.log(tableItems.toString());
        menu();
    })
}
function addInventory() {
    displayItems();
    inquirer
  .prompt([
      {
       name: "item",
       type: "input",
        message: "Select an ID of the product you want to add",
        validate: function (value) {
            if ((isNaN(value))) {
                console.log(`\nYou need to provide a number`);
                return false;
            }
            return true;
        }
      },
      {
        name: "add",
        type: "input",
         message: "How many would you like to add?",
         validate: function (value) {
            if ((isNaN(value))) {
                console.log(`\nYou need to provide a number`);
                return false;
            }
            return true;
        }
      }
  ])
}




menu();
