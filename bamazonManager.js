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
        .then(function (answer) {
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
        if (!res.length) {
            console.log("All items are above the quantity 5.")
        } else
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
    inquirer
        .prompt([
            {
                name: "itemID",
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
        ]).then(function (answer) {
            connection.query("SELECT * from products where item_id=?", [answer.itemID], function (err, res) {
                if (!res.length) {
                    console.log("That product ID does not exist. Please pick again.");
                    menu();
                }
                else {
                    updateQuantity = parseInt(res[0].stock_quantity) + parseInt(answer.add);
                    connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [updateQuantity, answer.itemID], function (err, res) {
                        console.log("Inventory updated");
                        menu();
                    })
                }
            })
        })
}
function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "product_name",
                type: "input",
                message: "Please input the name of the new product.",
                validate: function (value) {
                    if ((value)==="") {
                        console.log(`\nOops you forgot to type a name in. Please try again.`);
                        return false;
                    }
                    return true;
                }
            },
            {
                name: "dept_name",
                type: "input",
                message: "What department is this item to be put in",
                validate: function (value) {
                    if ((value)==="") {
                        console.log(`\nPlease provide a department name.`);
                        return false;
                    }
                    return true;
                }
            },
            {
                name: "price",
                type: "input",
                message: "How much will this item be?",
                validate: function (value) {
                    if ((isNaN(value))) {
                        console.log(`\nPlease enter the price as a number.`);
                        return false;
                    }
                    return true;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "What's the quantity in stock?",
                validate: function (value) {
                    if ((isNaN(value))) {
                        console.log(`\nPlease enter the quantity as a number.`);
                        return false;
                    }
                    return true;
                }
            }
        ]).then(function (answer) {
            connection.query("INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES (?,?,?,?)", [answer.product_name, answer.dept_name, answer.price, answer.quantity], function (err, res) {
                console.log("Inventory added!");
                menu();
            })
        })
    }


menu();
