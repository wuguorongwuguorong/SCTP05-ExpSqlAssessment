const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const { createConnection } = require('mysql2/promise');
const waxOn = require('wax-on');
const res = require('express/lib/response');
require('dotenv').config();

// 1D. SETUP WAX ON (FOR TEMPLATE INHERITANCE)
waxOn.on(hbs.handlebars);
waxOn.setLayoutPath('./views/layouts')

// Include the 188 handlebar helpers
const helpers = require('handlebars-helpers')({
    handlebars: hbs.handlebars
});

let app = express();// declare before starting to use 'app..."

// 1B. SETUP VIEW ENGINE
app.set('view engine', 'hbs');

app.use(express.urlencoded({
    extended: false // set to false for fast form processing but without advanced features
}))

// 1C. SETUP STATIC FOLDER
//app.use(express.static('public'));

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

        const [customers] = await connection.execute({
            'sql': query,
            'nestTables': true
        }, bindings);

        res.render('customers.hbs', {
            "allCustomers": customers,
            "searchTerms": req.query
        })
    })

    //add new customers into database and display in a new page
    app.get('/customers/create', async function (req, res) {
        const [customers] = await connection.execute("SELECT * FROM customers")
        console.log(customers);
        res.render('create_customers', {
            "allCustomers": customers,
            "searchTerms": req.query
        });
    })
    //add new customers into database and display
    app.post('/customers/create', async function (req, res) {
        const { custf_name, custl_name, cust_email } = req.body;
        const query = "INSERT INTO customers(custf_name, custl_name, cust_email) VALUES (? ,?, ?);"
        const results = await connection.execute(query, [custf_name, custl_name, cust_email]);
        //res.send(results)
        res.redirect('/customers');
    })

    //delete of customers
    app.get('/customers/:customer_id/delete', async function (req, res) {
        try{
            const customer_id = req.params.customer_id;
            const [customersInvoices] = await connection.execute("SELECT * FROM invoices WHERE customer_id =?",
                [customer_id]);
    
            if (customersInvoices.length > 0) {
                res.render('errors', {
                    'errorMessage': "The Customer still have outstanding balance"
                })
                return;
            }
            const [customers] = await connection.execute("SELECT * FROM customers WHERE customer_id = ?",
                [customer_id]);
            const customerToDelete = customers[0];
            res.render("delete_customers", {
                'customer': customerToDelete    
            })
        }catch(e){
            res.json(404)
        }  
    })
    app.post('/customers/:customer_id/delete', async function(req,res){
        try{
          const query = "DELETE FROM customers where customer_id=?";
          await connection.execute(query,[req.params.customer_id]);
        //  res.render('successful_message',{
        //    'happyMessage': 'customer deleted successfully'
        //})
            res.redirect('/customers');
        }catch(e){
            res.render('error',{
                'errorMessage': 'Unable to delete customer'
            })
        }
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
        try {
            const { custf_name, custl_name, cust_email } = req.body;
            const query = `UPDATE customers SET custf_name= ? , custl_name = ?, cust_email =? WHERE customer_id =?`;
            const bindings = [custf_name, custl_name, cust_email, req.params.customer_id];
            await connection.execute(query, bindings);
            console.log('Request Body:', req.body);
            console.log('Customer ID:', req.params.customer_id);

            res.redirect('/customers');
        } catch (e) {
            res.render('errors', {
                'errorMessage': "Unable to edit customer"
            })
        }

    })

}
main();



app.listen(3000, () => {
    console.log("Server started")
})

