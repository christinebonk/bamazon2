var mysql = require("mysql");
var cTable = require('console.table');
var inquirer = require("inquirer");
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "bamazon"
});

// function supervisorOptions() {
// 	inquirer.prompt ([
// 		{
// 			"name": "supervisorChoice",
// 			"type": "list",
// 			"choices": ["View Products Sales by Department", "Create New Department", "Exit"],
// 			"message": "What would you like to do?",
// 		}
// 	]).then(function(response) {
// 		var supervisorChoice = response.supervisorChoice;
// 		if (supervisorChoice === "View Products Sales by Department") {
// 			viewProducts();
// 		} else if (supervisorChoice === "Create New Department") {
// 			viewLowInventory();
// 		} else if (supervisorChoice === "Exit") {
// 			console.log("Goodbye!")
// 			return;
// 		}
// 	});

// };


function viewProducts() {
	var queryURL = `SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id`;
	con.query(queryURL, function(err, result) {
		if(err) {
			console.log(err);	
		}
		console.table(result);
	})
	

}

viewProducts();

// SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS sales_total, sales_total AS total_profit FROM departments INNER JOIN products ON departments.department_name=products.department_name GROUP BY departments.department_id