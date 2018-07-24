var mysql = require("mysql");
var cTable = require('console.table');
var inquirer = require("inquirer");
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "bamazon"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT item_id, product_name, price FROM products", function (err, result, fields) {
    if (err) throw err;
    console.log("-----------------------------------------------------------------");
    console.log("WELCOME TO BAMAZON");
    console.log("-----------------------------------------------------------------");
    console.log("PLEASE FIND OUR AMAZING PRODUCTS BELOW");
    console.log("-----------------------------------------------------------------");
    console.table(result);
    chooseProduct();
  });

});

function chooseProduct() {
	inquirer.prompt([
		{
			"name": "order",
			"type": "input",
			"message": "Please provide the ID of the product you would like to purchase!",
		}
	]).then(function(response) {
		var order = response.order;
		var product;
		con.query(`SELECT product_name FROM products WHERE item_id=${order}`, function(err, result) {
			if(err) {
					console.log(err)
			}
			product = result[0].product_name;
			howMany(order, product);
		});
	});
}

function howMany(order, product) {
	inquirer.prompt([
		{
			"name": "many",
			"type": "input",
			"message": "How many " + product + "s would you like?",
		}
	]).then(function(response) {
		var number = response.many;
		console.log("Let me see if we can get " + number + " " + product + "s for you!")
		checkProduct(number, product, order);
	})
}

function checkProduct(number, product, order) {
	con.query(`SELECT stock_quantity FROM products WHERE item_id=${order}`, function(err, result) {
		if(err) {
					console.log(err)
		}
		var quantity = parseInt(result[0].stock_quantity);
		if(number > quantity) {
			console.log("Sorry it looks like we are out of stock!");
		} else {
			console.log("We have enough in stock! Let me get your order ready!")
			var remaining = quantity - number;
			con.query(`UPDATE products SET stock_quantity=${remaining} WHERE item_id=${order}`, function(err, result) {
				if(err) {
					console.log(err)
				}
			});
			con.query(`SELECT price FROM products WHERE item_id=${order}`, function(err, result) {
				if(err) {
					console.log(err)
				}
				var price = result[0].price;
				var total = price * number;
				console.log("Your total cost is $" + total + "!")
				con.query(`UPDATE products SET product_sales = product_sales + ${total} WHERE item_id=${order}`, function(err, result) {
					if(err) {
						console.log(err)
					}
					console.log("Updated")
				});
			});
		};
	});
}



