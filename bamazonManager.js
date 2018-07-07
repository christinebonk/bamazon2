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
			"choices": ["View Products for Sales", "View Low Inventory", "Add to Inventory", "Add New Produt"],
			"message": "What would you like to do?",
		}
	]).then(function(response) {
		console.log(response.managerChoice);
	});
}

managerOptions();

function viewProducts() {

}