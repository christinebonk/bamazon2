var mysql = require("mysql");
var cTable = require('console.table');
var inquirer = require("inquirer");
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "bamazon"
});

function managerOptions() {
	inquirer.prompt ([
		{
			"name": "managerChoice",
			"type": "list",
			"choices": ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
			"message": "What would you like to do?",
		}
	]).then(function(response) {
		var managerChoice = response.managerChoice;
		if (managerChoice === "View Products for Sale") {
			viewProducts();
		} else if (managerChoice === "View Low Inventory") {
			viewLowInventory();
		} else if (managerChoice === "Add to Inventory") {
			addToInventory();
		} else if (managerChoice === "Add New Product") {
			addNewProduct();
		} else if (managerChoice === "Exit") {
			console.log("Goodbye!")
			return;
		}
	});

}

managerOptions();

function viewProducts() {
	con.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, result, fields) {
    if (err) throw err;
    console.log("-----------------------------------------------------------------");
    console.log("INVENTORY BELOW");
    console.log("-----------------------------------------------------------------");
    console.table(result);
    managerOptions();
  });
}

function viewLowInventory() {
	con.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err, result) {

		if(err) {
			console.log(err);
		}
		console.table(result);
		managerOptions();
	});
}

function addToInventory() {
	inquirer.prompt ([
		{
			"name": "more",
			"type": "input",
			"message": "Enter the product id of the product you would like to order more of!",
		}
	]).then(function(response) {
		var order = response.more;
		con.query(`UPDATE products SET stock_quantity = stock_quantity + 10 WHERE item_id = ${order}`, function(err, result) {
			if(err) {
				console.log(err);
			}
		});
		con.query(`SELECT product_name FROM products WHERE item_id=${order}`, function(err, result) {
			if(err) {
					console.log(err)
			}
			var product = result[0].product_name;
			console.log(`Ordered 10 more ${product}s!`);
			console.log("-----------------------------------------------------------------");
			managerOptions();
		});	
	});
};

function addNewProduct() {
	inquirer.prompt ([
		{
			name: "product",
			type: "input",
			message: "Enter the name of your new product"
		},
		{
			name: "department",
			type: "list",
			choices: ["Bedroom", "Kitchen", "Outdoor"],
			message: "Enter the department of your new product",
		}, 
		{
			name: "price",
			type: "input",
			message: "How much would you like to sell your product for?",
		}, 
		{
			name: "quantity",
			type: "input",
			message: "How many would you like to order?",
		}
	]).then(function(response) {
		var product = response.product;
		product = '"' + product + '"';
		var department = response.department;
		department = '"' + department + '"';
		var price = response.price;
		var quantity = response.quantity;
		con.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (${product}, ${department}, ${price}, ${quantity})`, function(err, result) {
			if(err) {
				console.log(err);
			}
			console.log("I have added " + quantity + " " + response.product + "s for you!");
			managerOptions();
		});
	})
}