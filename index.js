const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const { createConnection } = require('mysql2/promise');
require('dotenv').config();

let app = express();// declare before starting to use 'app..."

// 1B. SETUP VIEW ENGINE
app.set('view engine', 'hbs');

// 1C. SETUP STATIC FOLDER
app.use(express.static('public'));

// Include the 188 handlebar helpers
const helpers = require('handlebars-helpers')({
    handlebars: hbs.handlebars
});

// 1D. SETUP WAX ON (FOR TEMPLATE INHERITANCE)
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

app.use(express.urlencoded({
    extended: false // set to false for fast form processing but without advanced features
}))

async function main() {
    // create a connection to our MySQL database
    const connection = await createConnection({
        'host': process.env.DB_HOST,
        'user': process.env.DB_USER,
        'database': process.env.DB_NAME,
        'password': process.env.DB_PASSWORD
    });

    app.get('/', function (req, res) {
        res.render('index.hbs');
    })

    // add routes here 
    app.get('/', function (req, res) {
        res.send("<h1>Hello from Express</h1>");
    })
    app.get('/customers', async function (req, res) {

        // Begin with a base query
        // The base query will return all the rows
        // SQL to execute: SELECT * FROM Customers
        let query = `SELECT * FROM customers WHERE 1`

        const bindings = [];

        // extract search terms
        const { custf_name, custl_name, cust_email } = req.query;

        if (custf_name) {
            query += ` AND custf_name LIKE ?`;
            bindings.push('%' + custf_name + '%')
        }

        if (custl_name) {
            query += ` AND custl_name LIKE ?`;
            bindings.push('%' + custl_name + '%');
        }
        if (cust_email) {
            query += ` AND cust_email LIKE ?`;
            bindings.push('%' + cust_email + '%');
        }


        console.log(query);

        // INSTEAD OF:
        // const results = await connection.execute(query);
        // // connection.execute will return an array
        // // index 0 will be an array of our records that we want
        // const customers = results[0];

        // we can use array destructring to just take the
        // first result from an array
        const [customers] = await connection.execute({
            'sql': query,
            'nestTables': true
        }, bindings);

        res.render('customers.hbs', {
            "allCustomers": customers,
            "searchTerms": req.query
        })
    })

    //add new customers into database and display
    app.get('/customers/create', async function (req, res) {
        const [customers] = await connection.execute("SELECT * FROM customers")
        console.log(customers);
        res.render('create_customer', {
            "allCustomers": customers,
            "searchTerms": req.query
        });
    })

    app.post('/customers/create', async function (req, res) {
        const { custf_name, custl_name, cust_email } = req.body;
        const query = "INSERT INTO customers(custf_name, custl_name, cust_email) VALUES (? ,?, ?);"
        const results = await connection.execute(query, [custf_name, custl_name, cust_email]);
        //res.send(results)
        res.redirect('/customers');
    })

    //update customers page
    app.get('/customers/:customer_id/update', async function (req, res) {
        const [invoices] = await connection.execute("SELECT * FROM invoices")
        const [customers] = await connection.execute("SELECT * FROM customers WHERE customer_id = ?",
            [req.params.customer_id])
        const customer = customers[0];
        res.render('edit_customers', {
            customer,
            invoices
        })
    })

    app.post('/customers/:customer_id/update', async function (req, res) {
        const { custf_name, custl_name, cust_email } = req.body;
        const query = `UPDATE customers SET custf_name= ? , custl_name = ? cust_email =?
         WHERE customer_id =?`;
        const bindings = [custf_name, custl_name, cust_email, req.params_customer_id];
        await connection.execute(query, bindings);
        console.log('Request Body:', req.body);
        console.log('Customer ID:', req.params.customer_id);

        res.redirect('/customers');
    })

}
main();



app.listen(3000, () => {
    console.log("Server started")
})

