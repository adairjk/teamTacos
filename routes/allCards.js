var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/tacos';

//router.post('/contact', function(req, res) {
exports.create = function(req, res) {
    var results = [];

    // Grab data from http request
    var data = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        client.query("INSERT INTO contacts(firstname, lastname, email) values($1, $2, $3)", [data.firstname, data.lastname, data.email]);

        var query = client.query("SELECT * FROM contacts ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
};

exports.read = function(req, res) {

    var results = [];

    pg.connect(connectionString, function (err, client, done) {

        var query = client.query("SELECT * FROM contacts ORDER BY id ASC;");

        query.on('row', function (row) {
            results.push(row);
        });

        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        if (err) {
            console.log(err);
        }

    });

};




//exports.index = function(req, res) {
//    res.status(200).json(
//        { contacts: [
//            {firstName:'Oscar', lastName:'Boom', email: 'bisbot@gmail.com'},
//            {firstName:'Umair', lastName:'Boom'},
//            {firstName:'Wallace', lastName:'Boom', email: 'wallaceh@gmail.com'}
//    ]});
//}

//CREATE 	/api/v1/todos 	Create a single todo
//READ 	/api/v1/todos 	Get all todos
//UPDATE 	/api/v1/todos/:todo_id 	Update a single todo
//DELETE 	/api/v1/todos/:todo_id 	Delete a single todo