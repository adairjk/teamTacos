var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/tacos';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE contacts(id SERIAL PRIMARY KEY, firstName VARCHAR(40) not null, lastName VARCHAR(40), email VARCHAR(40))');
query.on('end', function() { client.end(); });
