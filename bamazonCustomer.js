const mysql = require("mysql");
const inquirer = require("inquirer");
// var fs = require("fs");
var Table = require('cli-table');
var itemsARR = [];

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
        var tableItems = new Table({
            head: ['Id', 'Product Name', 'Department Name', 'Price', 'QTY'],
            colWidths: [6, 20, 20, 10, 8]
        });
        console.log("\n");
        console.log("            Welcome to Bamazon! Your online Bazaar of deals!");
        for (var i = 0; i < res.length; i++) {
            itemsARR.push(res[i].item_id);
            tableItems.push(
                [res[i].item_id, res[i].product_name
                    , res[i].department_name, res[i].price, res[i].stock_quantity]
            );

        }
        
        console.log(tableItems.toString());
        purchase();
    })
}

function purchase() {
    inquirer
        .prompt([{
            name: "itemId",
            type: "input",
            message: "Pick an item by it's ID number to buy it.",
           
            validate: function(input) {
                var input = parseInt(input);
                if (itemsARR.includes(input)=== false){
                    console.log("\r\nI'm sorry that number is not valid.Please pick an id number from the list provided");
                    setTimeout(function() { displayItems() }, 2000);
                }
                
                var done = this.async();
                setTimeout(function() {  
                    // console.log(isNaN(input));
                     
                  if ((isNaN(input))&&(itemsARR.includes(input))) { 
                      
                    done("Please pick an id of the item you want from the list provided.");
                    return;
                  }   
                //   console.log("after validation" +input);
                //   console.log("after validation" +itemsARR);
                  done(null,true);
                }, 1000);
              }
        },
        
        {
            name: "quantity",
            type: "input",
            message: "How many would you like?",
            validate: function(input) {
                var done = this.async();
                setTimeout(function() {
                  if (isNaN(input)) { 
                    done("Please provide a number");
                    return;
                  }    
                  done(null,true);
                }, 1000);
              }
        }
        ])
        .then(function (answer) {
            connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?",
                { item_id: answer.itemId }, function (err, results) {
                    if (err) throw err;
                    if (results[0].stock_quantity < parseInt(answer.quantity)) {
                        console.log("Insufficient quantity to complete your order. There are only " 
                        + results[0].stock_quantity + " item(s) left. Please try again...");
                        shopAgain();
                    } else {
                        console.log("You purchased " + answer.quantity + " item(s) with the ID of " 
                        + results[0].item_id
                            + " and product name of " + results[0].product_name + ".");


                        connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                         [answer.quantity, results[0].item_id],
                            function (error) {
                                if (error) throw err;

                                var total = (results[0].price * answer.quantity).toFixed(2);
                                console.log("Your total is: " + total);
                                console.log("That completes your order! Thanks for shopping at Bamazon!");
                                shopAgain();
                            }
                        );

                    }
                });
        });

    function shopAgain() {
        inquirer
            .prompt({
                name: "continue",
                type: "list",
                choices: ["Continue", "Quit"],
                message: "Would you like to [CONTINUE] shopping or [QUIT] and exit?",
            })
            .then(function (answer) {
                if (answer.continue === "Continue") {
                    console.log(`\r\n You picked "Continue to shop".`)
                    displayItems();
                } else {

                    console.log("Thank you! Come again!");
                    connection.end();
                }
            });
    };
};

